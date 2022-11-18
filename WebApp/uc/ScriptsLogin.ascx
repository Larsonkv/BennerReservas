<%@ Control Language="C#" AutoEventWireup="true" Inherits="Benner.Tecnologia.Wes.Components.WebApp.ScriptsLogin" %>
<%@ Import Namespace="Benner.Tecnologia.Wes.Components.Helpers" %>

<script src="<%=UrlResolverHelper.ResolveUrl("~/content/dist/benner.min.js")%>" type="text/javascript" charset="utf-8"></script>
<script src="<%=ResolveVersionUrl("~/content/js/ServiceWorkerRegistration.js")%>" type="text/javascript" charset="utf-8"></script>


<script type="text/javascript">
    (function () {
        Layout.init();// Inicializa o layout
        Benner.Apps.Login.init();// Inicializa validações da tela de login
    })();
</script>
