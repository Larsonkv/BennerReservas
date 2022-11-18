<%@ Page Title="Acesso Temporário 2FA" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.WesPage" %>
   
<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
     
      <asp:Content ID="Content1" ContentPlaceHolderID="Main" Runat="Server">
    <div class="row">
        <wes:AjaxForm runat="server" ID="LIBERARACESSO" Title="Liberar Acesso" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="ACESSOSLIBERADOS" ChromeState="Normal" CanDelete="True" CanUpdate="True" CanInsert="True" EntityViewName="Z_2FALIBERACOES.FORM" FormMode="ReadOnly" IncludeRecordInRecentItems="True" UserDefinedCommandsVisible="True" PageId="SITESETTINGS_TEMPORARYACCESS" Level="15" Order="5"  />
        <wes:SimpleGrid runat="server" ID="ACESSOSLIBERADOS" Title="Acessos Liberados" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="" ChromeState="Normal" CanDelete="True" CanUpdate="True" CanInsert="True" EntityViewName="Z_2FALIBERACOES.GRID" Mode="Selectable" UserDefinedSelectColumnVisible="False" UserDefinedPageSize="10" SystemFilterOnly="False" DisplayRowCommand="True" CompanyFilterMode="OnlyCompany" ShowExport="True" UserDefinedDisableRowSelection="False" PageId="SITESETTINGS_TEMPORARYACCESS" Level="15" Order="10"  />
        </div>
    
      </asp:Content>
    