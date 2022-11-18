var FuncoesArroba = [
    {
        caption: '@CAMPO',
        type: 'snippet',
        meta: 'função',
        snippet: 'CAMPO(${1:nome_campo})',
        docHTML: '<b>@CAMPO(nome_campo)</b>' +
            '<hr>Retorna o conteúdo do campo especificado do registro atual.</br>' +
            '<br>Exemplo: A.PAIS = @CAMPO(PAIS)'
    },
    {
        caption: '@~CAMPO',
        type: 'snippet',
        meta: 'função',
        snippet: '~CAMPO(${1:nome_campo})',
        docHTML: '<b>@~CAMPO(nome_campo)</b>' +
            '<hr>Retorna o conteúdo do campo especificado do registro atual. A diferença é que se o campo informado não estiver preenchido,' +
            '<br>esta função irá retornar - 1, ao invés de exigir o preenchimento.</br>' +
            '<br>Exemplo: A.PAIS = @~CAMPO(PAIS)'
    },
    {
        caption: '@@CAMPO',
        type: 'snippet',
        meta: 'função',
        snippet: '@CAMPO(${1:nome_campo})',
        docHTML: '<b>@@CAMPO(nome_campo)</b>' +
            '<hr>Retorna o conteúdo do campo especificado do registro atual. A diferença é que se o campo informado não estiver preenchido,' +
            '<br>esta função irá retornar - 1, ao invés de exigir o preenchimento.</br>' +
            '<br>Exemplo: A.PAIS = @@CAMPO(PAIS)'
    },
    {
        caption: '@EMPRESA',
        type: 'snippet',
        meta: 'função',
        snippet: 'EMPRESA',
        docHTML: '<b>@EMPRESA</b><hr>Retorna o Handle da empresa corrente.'
    },
    {
        caption: '@EMPRESAMESTRE',
        type: 'snippet',
        meta: 'função',
        snippet: 'EMPRESAMESTRE(${1:nome_tabela})',
        docHTML: '<b>@EMPRESAMESTRE(nome_tabela)</b><hr>Retorna o handle da empresa mestre da tabela informada.'
    },
    {
        caption: '@FILIAL',
        type: 'snippet',
        meta: 'função',
        snippet: 'FILIAL',
        docHTML: '<b>@FILIAL</b><hr>Retorna o Handle da filial selecionada. Se todas estão selecionadas, retorna 0 (zero).'
    },
    {
        caption: '@FILIAIS',
        type: 'snippet',
        meta: 'função',
        snippet: 'FILIAIS',
        docHTML: '<b>@FILIAIS</b><hr>Retorna uma string com os Handles das filiais selecionadas entre parênteses e separadas por vírgulas, para ser utilizada em uma cláusula IN.'
    },
    {
        caption: '@SESSAO',
        type: 'snippet',
        meta: 'função',
        snippet: 'SESSAO(${1:nome_variavel})',
        docHTML: '<b>@SESSAO(nome_variavel)</b>' +
            '<hr>Retorna o conteúdo de uma variável de sessão, sem nenhum tratamento. A variável de sessão pode conter um valor ou uma expressão SQL completa.' +
            '<br>Se a variável de sessão não existir será gerado um erro para o usuário.'
    },
    {
        caption: '@~SESSAO',
        type: 'snippet',
        meta: 'função',
        snippet: '~SESSAO(${1:nome_variavel})',
        docHTML: '<b>@~SESSAO(nome_variavel)</b>' +
            '<hr>Retorna o conteúdo de uma variável de sessão, sem nenhum tratamento. A variável de sessão pode conter um valor ou uma expressão SQL completa.' +
            '<br>Se a variável de sessão não existir a função irá retornar uma string vazia.'
    },
    {
        caption: '@TABELA',
        type: 'snippet',
        meta: 'função',
        snippet: 'TABELA(${1:nome_tabela})',
        docHTML: '<b>@TABELA(nome_tabela)</b><hr>Retorna o Handle do último registro acessado da tabela informada, levando em consideração o caminho de navegação do usuário(rastro ou breadcrumb).'
    },
    {
        caption: '@USUARIO',
        type: 'snippet',
        meta: 'função',
        snippet: 'USUARIO',
        docHTML: '<b>@USUARIO</b><hr>Retorna o Handle do usuário corrente.Retorna o Handle do usuário corrente.'
    },
    {
        caption: '@PAPEL',
        type: 'snippet',
        meta: 'função',
        snippet: 'PAPEL',
        docHTML: '<b>@PAPEL</b><hr>Retorna o Handle do papel corrente do usuário.'
    },
    {
        caption: '@TAREFAS',
        type: 'snippet',
        meta: 'função',
        snippet: 'TAREFAS',
        docHTML: '<b>@TAREFAS</b>' +
            '<hr>Retorna a lista de tarefas que o papel corrente do usuário tem permissão. Os itens são separados por vírgula' +
            '<br>e são colocados entre parênteses, dessa forma é possível utilizar um comando similar a A.TAREFA IN @TAREFAS.'
    },
    {
        caption: '@PROXHANDLE',
        type: 'snippet',
        meta: 'função',
        snippet: 'PROXHANDLE(${1:nome_tabela})',
        docHTML: '<b>@PROXHANDLE(nome_tabela)</b>' +
            '<hr>Retorna o script SQL próprio de cada banco de dados para obter o próximo HANDLE que será gerado pela SEQUENCE.' +
            '<br>Para os bancos de dados que não suportam sequence é feita uma chamada ao BServer para gerar o próximo HANDLE, e retornando o valor já gerado.' +
            '<br>A tabela precisa estar com o flag Controle de handle pelo banco de dados habilitado e com APELIDO da tabela preenchido.</br>' +
            '<br>Exemplo: INSERT TABELA(HANDLE, NOME) VALUES(@PROXHANDLE, "JOAO").' +
            '<br>OBS: Esta comando NÃO pode ser utilizado para inserções multi - linhas(INSERT de SELECT) pois existem bancos de dados que ainda são suportados' +
            '<br>pela Benner e que não tem o recurso de SEQUENCE (Ex: SQL - Server 2008r2).'
    },
    {
        caption: '@ADICIONARDIAS',
        type: 'snippet',
        meta: 'função',
        snippet: 'ADICIONARDIAS(${1:nome_campo}, {2:inteiro})',
        docHTML: '<b>@ADICIONARDIAS(nome_campo, inteiro)</b><hr>Retorna o campo com número de dias somado. Aceita também números negativos.'
    },
    {
        caption: '@ADICIONARMESES',
        type: 'snippet',
        meta: 'função',
        snippet: 'ADICIONARMESES(${1:nome_campo}, {2:inteiro})',
        docHTML: '<b>@ADICIONARMESES(nome_campo, inteiro)</b><hr>Retorna o campo com número de meses somado. Aceita também números negativos.'
    },
    {
        caption: '@ADICIONARANOS',
        type: 'snippet',
        meta: 'função',
        snippet: 'ADICIONARANOS(${1:nome_campo}, {2:inteiro})',
        docHTML: '<b>@ADICIONARANOS(nome_campo, inteiro)</b><hr>Retorna o campo com número de anos somado. Aceita também números negativos.'
    },
    {
        caption: '@AGORA',
        type: 'snippet',
        meta: 'função',
        snippet: 'AGORA',
        docHTML: '<b>@AGORA</b><hr>Retorna a data e hora atual.'
    },
    {
        caption: '@ANO',
        type: 'snippet',
        meta: 'função',
        snippet: 'ANO',
        docHTML: '<b>@ANO</b><hr>Retorna o ano da data corrente.'
    },
    {
        caption: '@ANO[1]',
        type: 'snippet',
        meta: 'função',
        snippet: 'ANO[1]',
        docHTML: '<b>@ANO[1]</b><hr>Retorna o primeiro dia do ano corrente.'
    },
    {
        caption: '@ANO[2]',
        type: 'snippet',
        meta: 'função',
        snippet: 'ANO[2]',
        docHTML: '<b>@ANO[2]</b><hr>Retorna o último dia do ano corrente.'
    },
    {
        caption: '@BIMESTRE[1]',
        type: 'snippet',
        meta: 'função',
        snippet: 'BIMESTRE[1]',
        docHTML: '<b>@BIMESTRE[1]</b><hr>Retorna o primeiro dia do bimestre corrente.'
    },
    {
        caption: '@BIMESTRE[2]',
        type: 'snippet',
        meta: 'função',
        snippet: 'BIMESTRE[2]',
        docHTML: '<b>@BIMESTRE[2]</b><hr>Retorna o último dia do bimestre corrente.'
    },
    {
        caption: '@DATA',
        type: 'snippet',
        meta: 'função',
        snippet: 'DATA(${1:data})',
        docHTML: '<b>@DATA(data)</b>' +
            '<hr>Retorna uma data no formato reconhecido pelo banco de dados. A data informada deve estar no formato dd / mm / aaaa e não deve ser colocada entre aspas ou apóstrofes.' +
            '<br>Exemplo: @DATA(31 / 12 / 2006) '
    },
    {
        caption: '@DATAPARTE',
        type: 'snippet',
        meta: 'função',
        snippet: 'DATAPARTE(${1:parte}, 2:{nome_campo})',
        docHTML: '<b>@DATAPARTE(parte, nome_campo)</b>' +
            '<hr>Retorna parte de uma data usando a função do banco de dados.A parte pode ser: "DIA", "MES" ou "ANO".' +
            '<br>Exemplo: @DATAPARTE(ANO, A.DATANASCIMENTO) '
    },
    {
        caption: '@DIA',
        type: 'snippet',
        meta: 'função',
        snippet: 'DIA',
        docHTML: '<b>@DIA</b><hr>Retorna o dia da data corrente.'
    },
    {
        caption: '@HOJE',
        type: 'snippet',
        meta: 'função',
        snippet: 'HOJE',
        docHTML: '<b>@HOJE</b><hr>Retorna a data atual.'
    },
    {
        caption: '@MES',
        type: 'snippet',
        meta: 'função',
        snippet: 'MES',
        docHTML: '<b>@MES</b><hr>Retorna o mês da data corrente.'
    },
    {
        caption: '@MES[1]',
        type: 'snippet',
        meta: 'função',
        snippet: 'MES[1]',
        docHTML: '<b>@MES[1]</b><hr>Retorna o primeiro dia do mês corrente.'
    },
    {
        caption: '@MES[2]',
        type: 'snippet',
        meta: 'função',
        snippet: 'MES[2]',
        docHTML: '<b>@MES[2]</b><hr>Retorna o último dia do mês corrente.'
    },
    {
        caption: '@QUINZENA[1]',
        type: 'snippet',
        meta: 'função',
        snippet: 'QUINZENA[1]',
        docHTML: '<b>@QUINZENA[1]</b><hr>Retorna o primeiro dia da quinzena corrente.'
    },
    {
        caption: '@QUINZENA[2]',
        type: 'snippet',
        meta: 'função',
        snippet: 'QUINZENA[2]',
        docHTML: '<b>@QUINZENA[2]</b><hr>Retorna o último dia da quinzena corrente.'
    },
    {
        caption: '@SEMANA[1]',
        type: 'snippet',
        meta: 'função',
        snippet: 'SEMANA[1]',
        docHTML: '<b>@SEMANA[1]</b><hr>Retorna o primeiro dia da semana corrente.'
    },
    {
        caption: '@SEMANA[2]',
        type: 'snippet',
        meta: 'função',
        snippet: 'SEMANA[2]',
        docHTML: '<b>@SEMANA[2]</b><hr>Retorna o último dia da semana corrente.'
    },
    {
        caption: '@SEMESTRE[1]',
        type: 'snippet',
        meta: 'função',
        snippet: 'SEMESTRE[1]',
        docHTML: '<b>@SEMESTRE[1]</b><hr>Retorna o primeiro dia do semestre corrente.'
    },
    {
        caption: '@SEMESTRE[2]',
        type: 'snippet',
        meta: 'função',
        snippet: 'SEMESTRE[2]',
        docHTML: '<b>@SEMESTRE[2]</b><hr>Retorna o último dia do semestre corrente.'
    },
    {
        caption: '@TRIMESTRE[1]',
        type: 'snippet',
        meta: 'função',
        snippet: 'TRIMESTRE[1]',
        docHTML: 'Responsável por trazer o trimestre corrente, podendo ter as seguintes opções: <b>@TRIMESTRE[1]</b> = Retorna o primeiro dia do trimestre corrente. <b>@TRIMESTRE[2]</b> = Retorna o último dia do trimestre corrente.'
    },
    {
        caption: '@TRIMESTRE[2]',
        type: 'snippet',
        meta: 'função',
        snippet: 'TRIMESTRE[2]',
        docHTML: 'Responsável por trazer o trimestre corrente, podendo ter as seguintes opções: <b>@TRIMESTRE[1]</b> = Retorna o primeiro dia do trimestre corrente. <b>@TRIMESTRE[2]</b> = Retorna o último dia do trimestre corrente.'
    },
    {
        caption: '@CONCATENAR',
        type: 'snippet',
        meta: 'função',
        snippet: 'CONCATENAR(${1:parâmetro1}, {2:parâmetro2})',
        docHTML: '<b>@CONCATENAR(parâmetro1, parâmetro2)</b>' +
            '<hr>Concatena dois valores passados por parâmetro. Os parâmetros podem ser Campos, Strings ou Parâmetros.' +
            '<br>Exemplo: @CONCATENAR("Nome: ", A.NOME).'
    },
    {
        caption: '@TROCARNULO',
        type: 'snippet',
        meta: 'função',
        snippet: 'TROCARNULO(${1:expressão}, {2:valor})',
        docHTML: '<b>@TROCARNULO(expressão, valor)</b>' +
            '<hr>Se a expressão retornar nulo, o valor retornado pela função será o especificado no parâmetro valor.' +
            '<br>Exemplo: @TROCARNULO(A.NOME, "(Nenhum)") para quando A.NOME for nulo, retorne a string "(Nenhum)".'
    },
    {
        caption: '@MAIUSCULAS',
        type: 'snippet',
        meta: 'função',
        snippet: 'MAIUSCULAS(${1:nome_campo | "string" })',
        docHTML: '<b>@MAIUSCULAS(nome_campo | "string")</b>' +
            '<hr>Converte o conteúdo do parâmetro informado para letras minúsculas, usando a função do banco de dados.' +
            '<br>Exemplo: @MAIUSCULAS(A.NOME) ou @MAIUSCULAS("Conteúdo string").'
    },
    {
        caption: '@CRITERIOSELECAO',
        type: 'snippet',
        meta: 'função',
        snippet: 'CRITERIOSELECAO',
        docHTML: '<b>@CRITERIOSELECAO</b>' +
            '<hr>Em uma fonte de dados QuerySource, pode surgir a necessidade de se passar um critério de seleção dinamicamente. Nesse caso poderá se usar no SQL' +
            '<br>a função @CRITERIOSELECAO, essa função será substituída pelo critério de seleção no momento da execução do comando SQL.Exemplo: SELECT A.HANDLE, A.NOME FROM MUNICIPIOS A WHERE @CRITERIOSELECAO'
    },
    {
        caption: '@DBLINK',
        type: 'snippet',
        meta: 'função',
        snippet: 'MAIUSCULAS(${1:tabela}, {2:nomeDatabaseLink})',
        docHTML: '<b>@MAIUSCULAS(tabela, nomeDatabaseLink)</b>' +
            '<hr>Esta função é para a utilização de um Database Link no Oracle ou de Linked Servers em MSSQL para consulta de outros banco de dados.' +
            '<br>Exemplo: SELECT A.HANDLE, A.NOME FROM @DBLINK(MUNICIPIOS, BASEEXTERNA) A.'
    },
    {
        caption: '@CONVERTER',
        type: 'snippet',
        meta: 'função',
        snippet: 'CONVERTER(${1:nome_campo}, {2:tipo}, {3:dígitos}, {4:decimais})',
        docHTML: '<b>@CONVERTER(parâmetro1, parâmetro2)</b>' +
            '<hr>Converte o valor do campo informado para o tipo especificado.' +
            '<br>Tipos suportados: STRING, INTEIRO, NUMERICO. Os tipos STRING e INTEIRO requerem apenas o nome do campo e o próprio tipo.</br>' +
            '<br>Exemplo: @CONVERTER(ESTOQUE, STRING) converte o campo inteiro ESTOQUE para string. O tipo NUMERICO exige 2 parâmetros adicionais, dígitos(precisão) e decimais(escala).</br>' +
            'Exemplo: @CONVERTER(PRECO, NUMERICO, 6, 3) converte o campo valor PRECO para numérico com 6 dígitos totais sendo 3 decimais.'
    },
    {
        caption: '@BITLIGADO',
        type: 'snippet',
        meta: 'função',
        snippet: 'BITLIGADO(${1:nome_campo}, {2:valor_bit})',
        docHTML: '<b>@BITLIGADO(nome_campo, valor_bit)</b>' +
            '<hr>Retorna uma expressão bitwise AND, que será verdadeira se os bits informados estão ligados.' +
            '<br>Exemplo: SELECT * FROM CARROS WHERE @BITLIGADO(OPCIONAIS, 5) AND ANO > 2008.'
    },
    {
        caption: '@BITDESLIGADO',
        type: 'snippet',
        meta: 'função',
        snippet: 'BITDESLIGADO(${1:nome_campo}, {2:valor_bit})',
        docHTML: '<b>@BITDESLIGADO(nome_campo, valor_bit)</b>' +
            '<hr>Retorna uma expressão bitwise AND, que será verdadeira se os bits informados estão desligados.' +
            '<br>Exemplo: SELECT * FROM CARROS WHERE @BITDESLIGADO(OPCIONAIS, 1) AND ANO > 2008.'
    },
    {
        caption: '@FILTROSDATABELA',
        type: 'snippet',
        meta: 'função',
        snippet: 'FILTROSDATABELA(${1:nome_tabela})',
        docHTML: '<b>@FILTROSDATABELA(nome_tabela)</b>' +
            '<hr>.Agora é possível indicar em comandos SQL a necessidade de injetar filtros tanto de empresa e filial quanto filtros de registro.' +
            '<br>A indicação deve ser feita no SQL através da função @FILTROSDATABELA, indicando a tabela de filtro.</br>' +
            '<br>Exemplo: SELECT * FROM PARCELAS A WHERE @FILTROSDATABELA(PARCELAS) AND A.DOCUMENTO > 0 </br>' +
            '<br>A tradução desta função leva em conta a empresa mestre da tabela e omite as filiais somente leitura.' +
            '<br>A tradução sempre aplica o alias padrão “A.”.Caso não haja nem filtro de registro, nem filtro de empresa e filial, a função será traduzida por “1 = 1”.'
    },
    {
        caption: '@NULL',
        type: 'snippet',
        meta: 'função',
        snippet: 'NULL(${1:campo},{2:expressao})',
        docHTML: '<b>@NULL(campo,expressao)</b>' +
            '<hr>.Retorna uma expressão caso o campo esteja nulo.' +            
            '<br>Exemplo: SELECT * FROM PAISES A WHERE A.NOME == "BRASIL" @NULL(GENTILICO, AND GENTILICO = "Brasileiro")/br>'
    },
    {
        caption: '@NOTNULL',
        type: 'snippet',
        meta: 'função',
        snippet: 'NOTNULL(${1:campo},{2:expressao})',
        docHTML: '<b>@NOTNULL(campo,expressao)</b>' +
            '<hr>.Retorna uma expressão caso o campo esteja nulo.' +            
            '<br>Exemplo: SELECT * FROM PAISES A WHERE A.NOME == "BRASIL" @NULL(GENTILICO, AND GENTILICO = "Brasileiro")/br>'
    },
];

export default FuncoesArroba;