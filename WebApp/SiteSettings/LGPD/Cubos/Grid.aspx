<%@ Page Title="Cubos" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.WesPage" %>
   
<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
     
      <asp:Content ID="Content1" ContentPlaceHolderID="Main" Runat="Server">
    <div class="row">
        <wes:SimpleGrid runat="server" ID="CUBOS" Title="Cubos" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="" ChromeState="Normal" CanDelete="False" CanUpdate="False" CanInsert="False" EntityViewName="Z_CUBOS.LGPD.GRID" Mode="Selectable" UserDefinedSelectColumnVisible="False" UserDefinedPageSize="10" SystemFilterOnly="False" DisplayRowCommand="True" CompanyFilterMode="OnlyCompany" ShowExport="True" UserDefinedDisableRowSelection="False" PageId="SITESETTINGS_LGPD_CUBOS_GRID" Level="15" Order="10"  />
        <wes:AjaxForm runat="server" ID="CUBO" Title="Cubo" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="CUBOS" ChromeState="Normal" CanDelete="False" CanUpdate="True" CanInsert="False" EntityViewName="Z_CUBOS.LGPD.FORM" FormMode="ReadOnly" IncludeRecordInRecentItems="True" UserDefinedCommandsVisible="True" PageId="SITESETTINGS_LGPD_CUBOS_GRID" Level="15" Order="20"  />
        </div>
    
      </asp:Content>
    