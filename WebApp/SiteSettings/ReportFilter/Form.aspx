<%@ Page Title="Filtro padrão" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.WesPage" %>
   
<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
     
      <asp:Content ID="Content1" ContentPlaceHolderID="Main" Runat="Server">
    <div class="row">
        <wes:AjaxForm runat="server" ID="FILTROPADRO" Title="Filtro padrão" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="" ChromeState="Normal" CanDelete="True" CanUpdate="False" CanInsert="True" EntityViewName="Z_FILTROS.BENNERREPORTS.FORM" FormMode="ReadOnly" IncludeRecordInRecentItems="True" UserDefinedCommandsVisible="True" PageId="SITESETTINGS_REPORTFILTER_FORM" Level="15" Order="10"  />
        <wes:SimpleGrid runat="server" ID="CONDIES" Title="Condições" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="FILTROPADRO" ChromeState="Normal" CanDelete="False" CanUpdate="False" CanInsert="False" EntityViewName="Z_FILTROCONDICOES.GRID" Mode="None" UserDefinedSelectColumnVisible="False" UserDefinedPageSize="10" SystemFilterOnly="False" DisplayRowCommand="True" CompanyFilterMode="OnlyCompany" ShowExport="True" UserDefinedDisableRowSelection="False" PageId="SITESETTINGS_REPORTFILTER_FORM" Level="15" Order="20"  />
        </div>
    
      </asp:Content>
    