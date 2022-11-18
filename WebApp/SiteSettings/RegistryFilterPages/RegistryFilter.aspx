<%@ Page Title="Filtro" Language="C#" 
    Inherits="Benner.Tecnologia.Wes.Components.WebApp.SiteSettings.RegistryFilterPages.RegistryFilterPage" %>
       
<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp"  TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
<asp:content id="Content1" contentplaceholderid="Main" runat="Server" >
    <div class="row">
        <wes:AjaxForm runat="server" ID="FILTROS" Title="Prever" UserDefinedCommandsVisible="True" UserDefinedCriteriaWhereClause=""  />  
    </div>
</asp:content>
    