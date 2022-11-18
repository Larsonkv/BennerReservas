<%@ Page Title="Provedor de SMS" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.WesPage" %>
   
<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
     
      <asp:Content ID="Content1" ContentPlaceHolderID="Main" Runat="Server">
    <div class="row">
        <wes:AjaxForm runat="server" ID="PROVEDORSMS" Title="Provedor SMS" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="PROVEDORES" ChromeState="Normal" CanDelete="True" CanUpdate="True" CanInsert="True" EntityViewName="Z_SMS_CONFIG.FORM" FormMode="ReadOnly" IncludeRecordInRecentItems="True" UserDefinedCommandsVisible="True" PageId="SITESETTINGS_SMSPROVIDER" Level="15" Order="5"  />
        <wes:SimpleGrid runat="server" ID="PROVEDORES" Title="Provedores" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="" ChromeState="Normal" CanDelete="True" CanUpdate="True" CanInsert="True" EntityViewName="Z_SMS_CONFIG.GRID" Mode="Selectable" UserDefinedSelectColumnVisible="False" UserDefinedPageSize="10" SystemFilterOnly="False" DisplayRowCommand="True" CompanyFilterMode="OnlyCompany" ShowExport="True" UserDefinedDisableRowSelection="False" PageId="SITESETTINGS_SMSPROVIDER" Level="15" Order="10"  />
        </div>
    
      </asp:Content>
    