<%@ Page Title="Configuração de autenticação" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.WesPage" %>
   
<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
     
      <asp:Content ID="Content1" ContentPlaceHolderID="Main" Runat="Server">
    <div class="row">
        <wes:AjaxForm runat="server" ID="CONFIGURAO" Title="Configuração" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="" ChromeState="Normal" CanDelete="False" CanUpdate="True" CanInsert="True" EntityViewName="Z_AUTH_CONFIG.FORM" FormMode="ReadOnly" IncludeRecordInRecentItems="False" UserDefinedCommandsVisible="True" PageId="SITESETTINGS_ZAUTHCONFIG_CONFIG" Level="15" Order="10"  />
        <wes:EditableGrid runat="server" ID="PARMETROS" Title="Parâmetros" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="CONFIGURAO" ChromeState="Normal" CanDelete="True" CanUpdate="True" CanInsert="True" EntityViewName="Z_AUTH_CONFIG_PARAMS.GRID" Mode="Search" UserDefinedSelectColumnVisible="False" UserDefinedPageSize="20" SystemFilterOnly="False" DisplayRowCommand="True" CompanyFilterMode="OnlyCompany" UserDefinedCriteriaWhereClause="A.TIPOAUTENTICACAO = @CAMPO(TIPOAUTENTICACAO)" PageId="SITESETTINGS_ZAUTHCONFIG_CONFIG" Level="15" Order="20"  />
        </div>
    
      </asp:Content>
    