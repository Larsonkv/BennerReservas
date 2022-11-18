<%@ Page Language="C#" AutoEventWireup="true" Inherits="Benner.Tecnologia.Wes.Components.WebApp.ErrorPage" %>

<%@ Register Src="~/uc/ErrorSection.ascx" TagName="EntityFieldListControl" TagPrefix="wes" %>
<%@ Import Namespace="Benner.Tecnologia.Wes.Components.Helpers" %>

<!doctype html>
<html lang="pt" class="no-js">
    <head runat="server">
    </head>
    <body class="bg-white">

        <script src="<%= Page.ResolveUrl("~/scripts/WebForms/MsAjax/MicrosoftAjax.js")%>" type="text/javascript" charset="utf-8"></script>
        <script src="<%= Page.ResolveUrl("~/scripts/WebForms/MsAjax/MicrosoftAjaxWebForms.js")%>" type="text/javascript" charset="utf-8"></script>
        <script src="<%= UrlResolverHelper.ResolveUrl("~/content/dist/benner.min.js") %>" type="text/javascript" charset="utf-8"></script>

        <wes:EntityFieldListControl ID="ErrorSectionControl" runat="server" />

    </body>
</html>
