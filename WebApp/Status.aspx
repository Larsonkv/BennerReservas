<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Configuration" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="Benner.Tecnologia.Bas.AppServer.WebService" %>
<%@ Import Namespace="Benner.Tecnologia.Wes.Components.WebApp" %>
<%@ Import Namespace="Benner.Tecnologia.BServer.Clients" %>
<%@ Import Namespace="Benner.Tecnologia.Common" %>
<%@ Import Namespace="Benner.Tecnologia.Common.Instrumentation" %>
<%@ Import Namespace="Benner.Tecnologia.Bas.AppServer.BusinessLogic" %>
<%@ Import Namespace="Benner.Tecnologia.Common.Application" %>
<%@ Import Namespace="System.Security.Authentication" %>

<%@ Page Language="c#" AutoEventWireup="false" EnableTheming="false" Theme="" StylesheetTheme="" EnableSessionState="false" %>

<%
    try
    {
        // Garante que o warmup seja disparado (caso ainda não tenha sido)
        WarmupManager.Start();

        // Caso ainda não esteja aquecido, retorna erro
        if (!WarmupManager.CheckInitialization())
        {
            Response.StatusCode = 500;
            Response.Write(Response.Status);
            Response.Flush();
            Response.End();
            return;
        }

        string poolName = Benner.Tecnologia.Common.BennerContext.Administration.DefaultSystemInstanceName;
        var poolService = new PoolService();
        // Esta página faz dois tipos de testes:
        // 1. TESTE RÁPIDO: Apenas para ver se a pool está com problemas. Este teste sempre será executado.
        // 2. TESTE COMPLETO: Por padrão é executado a cada 30 segundos se a pool apresentou problemas. Ou forçado via ?testmode=full.
        // 3. TESTE DETALHADO: executado mediante ?testmode=detailed.
        //      - Teste de Bserver configurado conectável (testa se o Bserver está no ar) 
        //      - Teste de sistema cadastrado no Bserver (testa se o sistema configurado não está cadastrado no Bserver)
        //      - Teste de autenticação do usuário anônimo: to-do
        //      - Teste do servidor de sessão (testa se o servidor de sessão não esteja online)
        //      - Teste do servidor de log (testa se o servidor de log está online)
        //      - Teste da pool da aplicação (mesmo teste do ?testmode=full)

        // Observação importante:
        //   A status.aspx só irá retornar retornar erro caso algum usuário já tenha recebido algum erro antes.
        //   Isto garante velocidade no teste permitindo o uso indiscrimidado da status.aspx por WebRouters.

        // Observação importante 2:
        //  Para forçar um teste completo na pool mesmo que nenhum usuário tenha recebido algum erro 
        //  basta adicionar ?force na Request da status.aspx. Este teste é mais lento e deve ser executado
        //  por ferramentas de monitoramento com peridiocidade de no mínimo 1 minuto.     

        bool itsFullTestTime = Application["ET"] != null && ((DateTime)Application["ET"]).AddSeconds(30) <= DateTime.Now;
        bool forceFullTest = (Request["testmode"] ?? string.Empty).Equals("full", StringComparison.OrdinalIgnoreCase);
        bool detailedTest = (Request["testmode"] ?? string.Empty).Equals("detailed", StringComparison.OrdinalIgnoreCase);

        if (detailedTest)
        {
            var detailedTestsThrownException = false;
            var testModeDetailedData = new Dictionary<string, object>();

            BConnectionClient connection = new BConnectionClient();

            #region Test Host
            try
            {
                connection.Connect(BennerConfiguration.DefaultSuperServerHost);
                testModeDetailedData.Add("Servidor", new { Status = "OK" });
            }
            catch (Exception)
            {
                detailedTestsThrownException = true;
                testModeDetailedData.Add("Servidor", new { Status = "NOK", Message = "Benner Server Host não encontrado" });
            }
            #endregion

            #region Test System
            try
            {
                var systemNames = new ArrayList();
                connection.GetSystemNames(systemNames);

                if (!systemNames.Contains(BennerConfiguration.DefaultSuperServerSystemName))
                {
                    detailedTestsThrownException = true;
                    testModeDetailedData.Add("Sistema", new { Status = "NOK", Message = "Sistema não encontrado no Benner Server" });
                }
                else
                {
                    testModeDetailedData.Add("Sistema", new { Status = "OK" });
                }
            }
            catch (Exception ex)
            {
                detailedTestsThrownException = true;
                testModeDetailedData.Add("Sistema", new { Status = "NOK", Message = "Não foi possível se conectar ao Sistema." });
            }
            #endregion

            #region teste de autenticação de usuário anônimo
            try
            {
                BennerAppInfraServices.Default.BServerSystem.TestUser(BennerConfiguration.AnonymousUserName, BennerConfiguration.AnonymousPassword, Environment.MachineName);
                testModeDetailedData.Add("Usuário e senha", new { Status = "OK" });
            }
            catch (Exception)
            {
                detailedTestsThrownException = true;
                testModeDetailedData.Add("Usuário e senha", new { Status = "NOK", Message = "Falha ao validar o usuário interno e sua senha." });
            }
            #endregion

            #region Test Session Server
            try
            {
                var sessionValidator = new SessionServerValidator();
                sessionValidator.CheckAvailability();
                testModeDetailedData.Add("Configuração de sessão", new { Status = "OK" });
            }
            catch (Exception)
            {
                detailedTestsThrownException = true;
                testModeDetailedData.Add("Configuração de sessão", new { Status = "NOK", Message = "O servidor de sessão não está online. Certifique-se de que o servidor configurado está correto" });
            }
            #endregion

            #region Test Logging Server
            try
            {
                if (BennerConfiguration.LoggingServerActive)
                    ElasticSearchManager.CheckHealth();

                testModeDetailedData.Add("Configuração de log", new { Status = "OK" });
            }
            catch (Exception)
            {
                detailedTestsThrownException = true;

                testModeDetailedData.Add("Configuração de log", new { Status = "NOK", Message = "O servidor de logging não está online. Certifique-se de que o servidor configurado está correto" });
            }
            #endregion

            #region teste da pool
            try
            {
                poolService.TestPool(poolName);

                testModeDetailedData.Add("Pool da aplicação", new { Status = "OK" });
            }
            catch (Exception ex)
            {
                detailedTestsThrownException = true;

                testModeDetailedData.Add("Pool da aplicação", new { Status = "NOK", Message = ex.Message });
            }
            #endregion

            Application["testModeDetailedData"] = Newtonsoft.Json.JsonConvert.SerializeObject(testModeDetailedData);

            if (detailedTestsThrownException)
                throw new Exception();
        }
        else if (itsFullTestTime || forceFullTest)
        {
            // Teste completo (incluindo ping no Provider, Banco, BServer)
            // Este teste tenta reiniciar a pool caso ela tenha problemas
            Application["ET"] = null;
            poolService.TestPool(poolName);
        }
        else
        {
            // Teste rápido para ver se a pool não está com erros.
            // Este teste não tenta reiniciar a pool.
            poolService.GetPoolInfo(poolName);
            Application["ET"] = null;
        }
    }
    catch
    {
        if (Application["ET"] == null)
            Application["ET"] = DateTime.Now;

        Response.StatusCode = 500;
    }
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>

<head>
    <title>WES Status - <%=Response.StatusCode%></title>
    <meta name="GENERATOR" content="Microsoft Visual Studio .NET 7.1">
    <meta name="ProgId" content="VisualStudio.HTML">
    <meta name="Originator" content="Microsoft Visual Studio .NET 7.1">
</head>
<body>
    <% if ((Request["testmode"] ?? string.Empty).Equals("detailed", StringComparison.OrdinalIgnoreCase))
        { %><svg id="statusSteps" />
    <script>
        function _icon(x, y, radius, fill) {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('transform', `translate(${x}, ${y})`);

            const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            bgCircle.setAttribute('r', `${radius}`);
            bgCircle.setAttribute('fill', `${fill}`);

            g.appendChild(bgCircle);

            return g;
        }

        function ok_icon(x, y, radius, bg_fill, sign_fill) {
            const g = _icon(x, y, radius, bg_fill)

            const signPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            signPolygon.setAttribute('points', '-2.00 2.80 -4.80 0.00 -5.73 0.933 -2.00 4.67 6.00 -3.33 5.07 -4.27');
            signPolygon.setAttribute('fill', `${sign_fill}`);

            g.appendChild(signPolygon);

            return g;
        }

        function nok_icon(x, y, radius, bg_fill, sign_fill) {
            const g = _icon(x, y, radius, bg_fill)

            const signPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            signPolygon.setAttribute('points', '4.67 -3.73 3.73 -4.67 0 -0.94 -3.73 -4.67 -4.67 -3.73 -0.94 0 -4.67 3.73 -3.73 4.67 0 0.94 3.73 4.67 4.67 3.73 0.94 0');
            signPolygon.setAttribute('fill', `${sign_fill}`);

            g.appendChild(signPolygon);

            return g;
        }

        function line(x, y, x_size, y_size, width, color) {
            const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            l.setAttribute('x1', `${x}`);
            l.setAttribute('y1', `${y}`);
            l.setAttribute('x2', `${x + x_size}`);
            l.setAttribute('y2', `${y + y_size}`);

            l.setAttribute('stroke-width', `${width}`);
            l.setAttribute('stroke', `${color}`);

            return l;
        }

        function circle(x, y, radius, fill) {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('transform', `translate(${x}, ${y})`);

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('r', `${radius}`);
            circle.setAttribute('fill', `${fill}`);

            g.appendChild(circle);

            return g;
        }

        function text(x, y, value, text_anchor, font_size, color) {
            const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            t.setAttribute('x', `${x}`);
            t.setAttribute('y', `${y}`);
            t.setAttribute('text-anchor', `${text_anchor}`);
            t.setAttribute('dominant-baseline', 'middle');
            t.setAttribute('font-weight', '500');
            t.setAttribute('font-size', `${font_size}`);
            t.setAttribute('font-family', 'Inter,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-sans');
            t.setAttribute('fill', `${color}`);

            t.innerHTML = `${value}`

            return t
        }
    </script>

    <script>
        const testModeDetailedData = <%=Application["testModeDetailedData"]%>;

        let startTimeStamp, previousTimeStamp;
        let elapsed_total, elapsed;
        let done = false;

        const GREY = '#949393', WHITE = '#fff', SUCCESS = '#8cc04f', FAILURE = '#d54c53';
        const X_START = 8, Y_START = 8;
        const START_END_RADIUS = 12, ICON_RADIUS = 18, X_LABEL_OFFSET = 4;
        const Y_LINE_SIZE = 64;
        const LINE_WIDTH = 8;

        const MAX_USED_RADIUS = Math.max(START_END_RADIUS, ICON_RADIUS);

        const statusSteps = document.getElementById("statusSteps")

        let x = X_START + MAX_USED_RADIUS;
        let y = Y_START + MAX_USED_RADIUS;

        // start
        statusSteps.appendChild(circle(x, y, START_END_RADIUS, GREY));

        // first line
        statusSteps.appendChild(line(x, y, 0, Y_LINE_SIZE, LINE_WIDTH, GREY));
        y += Y_LINE_SIZE

        // each status
        for (statusCode in testModeDetailedData) {
            var statusData = testModeDetailedData[statusCode];
            console.log(statusCode);
            console.log(statusData);

            // vertical line
            statusSteps.appendChild(line(x, y, 0, Y_LINE_SIZE, LINE_WIDTH, GREY));

            // OK or NOK
            let icon

            if (statusData.Status == 'OK')
                icon = ok_icon(x, y, ICON_RADIUS, SUCCESS, WHITE);
            else
                icon = nok_icon(x, y, ICON_RADIUS, FAILURE, WHITE);

            statusSteps.appendChild(icon);

            // labels
            statusSteps.appendChild(text(x - ICON_RADIUS - X_LABEL_OFFSET, y, statusCode, 'end', 22, 'black')); // title

            if (statusData.Status != 'OK')
                statusSteps.appendChild(text(x + ICON_RADIUS + X_LABEL_OFFSET, y, statusData.Message, 'start', 18, FAILURE)) // error message

            // advance Y
            y += Y_LINE_SIZE
        }

        // end
        statusSteps.appendChild(circle(x, y, START_END_RADIUS, GREY));

        // setup SVG viewBox and size
        const box = statusSteps.getBBox();
        statusSteps.setAttribute('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
        statusSteps.setAttribute('width', '100%');
        statusSteps.setAttribute('height', '100%');
        statusSteps.setAttribute('preserveAspectRatio', 'xMinYMid meet');

        // TODO: below will be used to animate
        function tick() {
            
        }

        function step(timestamp) {
            if (startTimeStamp === undefined)
                startTimeStamp = timestamp;

            elapsed_total = timestamp - startTimeStamp;
            elapsed = timestamp - previousTimeStamp;

            if (previousTimeStamp !== timestamp) tick();

            previousTimeStamp = timestamp;

            if (!done) window.requestAnimationFrame(step);
        }

        function start() {
            startTimeStamp = previousTimeStamp = undefined;
            window.requestAnimationFrame(step);
        }

        // start();
    </script><% }
    else
    {%><h1><%=Response.Status%></h1><%}%>
</body>
</html>
