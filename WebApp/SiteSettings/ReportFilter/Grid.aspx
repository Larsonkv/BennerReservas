<%@ Page Title="Filtros padrão" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.WesPage" %>
   
<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
     
      <asp:Content ID="Content1" ContentPlaceHolderID="Main" Runat="Server">
    <div class="row">
        <wes:SimpleGrid runat="server" ID="GRIDZ_FILTROS" Title="Filtros de padrão" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="" ChromeState="Normal" CanDelete="True" CanUpdate="False" CanInsert="True" EntityViewName="Z_FILTROS.BENNERREPORTS.GRID" Mode="Selectable" UserDefinedSelectColumnVisible="False" UserDefinedPageSize="10" SystemFilterOnly="False" DisplayRowCommand="True" CompanyFilterMode="OnlyCompany" UserDefinedCriteriaWhereClause="A.PERMISSAO = 'N' AND A.CATEGORIA = 1" FormUrl="~/SiteSettings/ReportFilter/Form.aspx" ShowExport="True" UserDefinedDisableRowSelection="False" PageId="SITESETTINGS_REPORTFILTER_GRID" Level="15" Order="100"  />
        </div>
    
      </asp:Content>
    