<%@ Page Title="Log de processos" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.WesPage" %>
   
<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
     
      <asp:Content ID="Content1" ContentPlaceHolderID="Main" Runat="Server">
    <div class="row">
        <wes:SimpleGrid runat="server" ID="PROCESSOS" Title="Processos" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="" ChromeState="Normal" CanDelete="False" CanUpdate="False" CanInsert="False" EntityViewName="Z_PROCESSOS.GRID" Mode="Selectable" UserDefinedSelectColumnVisible="False" UserDefinedPageSize="50" SystemFilterOnly="False" DisplayRowCommand="True" CompanyFilterMode="OnlyCompany" FormUrl="~/SiteSettings/Processes/Form.aspx" ShowExport="True" UserDefinedDisableRowSelection="False" PageId="SITESETTINGS_PROCESSES_GRID" Level="15" Order="218"  />
        </div>
    
        <style>
              .filter-search-form{
    margin-bottom: 15px !important;
}

              </style>
      </asp:Content>
    