<%@ Page Title="Filtro de registros" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.FilterFormPage" %>
   
<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
     
      <asp:Content ID="Content1" ContentPlaceHolderID="Main" Runat="Server">
    <div class="row">
        <wes:AjaxForm runat="server" ID="FILTRODEREGISTROS" Title="Filtro de registros" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="" ChromeState="Normal" CanDelete="True" CanUpdate="False" CanInsert="True" EntityViewName="Z_FILTROS.FORM" FormMode="ReadOnly" IncludeRecordInRecentItems="True" UserDefinedCommandsVisible="True" PageId="RECORDSFILTERPAGEFORM" Level="15" Order="110"  />
        <wes:SimpleGrid runat="server" ID="CONDIES" Title="Condições" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="FILTRODEREGISTROS" ChromeState="Normal" CanDelete="False" CanUpdate="False" CanInsert="False" EntityViewName="Z_FILTROCONDICOES.GRID" Mode="None" UserDefinedSelectColumnVisible="False" UserDefinedPageSize="10" SystemFilterOnly="False" DisplayRowCommand="True" CompanyFilterMode="OnlyCompany" UserDefinedCriteriaWhereClause="A.FILTRO = @CAMPO(HANDLE)" ShowExport="True" UserDefinedDisableRowSelection="False" PageId="RECORDSFILTERPAGEFORM" Level="15" Order="120"  />
        </div>
    
      </asp:Content>
    