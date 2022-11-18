<%@ Page Title="Operações" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.SiteSettings.OperationGridPage" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Main" runat="Server">
    <div class="row">
        <wes:SimpleGrid runat="server" ID="GRIDWIDGET_635839563795657264" Title="Operações" BootstrapCols="6" UserDefinedDisableRowSelection="False" FormUrl="" UserDefinedCriteriaWhereClause="" UserDefinedDataSourceParameters="" CompanyFilterMode="OnlyCompany" DisplayRowCommand="True" SystemFilterOnly="False" UserDefinedPageSize="10" Mode="Search" UserDefinedSelectColumnVisible="False" CanInsert="False" CanUpdate="False" CanDelete="False" ChromeState="Fixed" EntityViewName="Z_OPERACOES.GRID" ShowTitle="True" />
        <wes:EditableGrid runat="server" ID="WIDGETID_635943443992400814" Title="Tarefas que incluem a operação" BootstrapCols="6" FormUrl="" UserDefinedCriteriaWhereClause="A.OPERACAO = @CAMPO(HANDLE)" UserDefinedDataSourceParameters="" CompanyFilterMode="OnlyCompany" DisplayRowCommand="True" SystemFilterOnly="False" UserDefinedPageSize="10" Mode="Search" UserDefinedSelectColumnVisible="False" DefaultFilterName="" CanInsert="True" CanUpdate="True" CanDelete="True" ChromeState="Fixed" EntityViewName="Z_TAREFAOPERACOES.GRID" ShowTitle="True" />
    </div>
</asp:Content>
