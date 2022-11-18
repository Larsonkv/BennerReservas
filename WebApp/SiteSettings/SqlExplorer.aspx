<%@ Page Title="SQL Explorer" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.WesPage" %>

<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Main" runat="Server">
    <div class="row">
        <wes:CustomUserControl runat="server" ID="SqlExplorer" Title="SQL Explorer" Subtitle="digite sua pesquisa" UserControlName="~/UC/SqlExplorer.ascx" />
    </div>
</asp:Content>
