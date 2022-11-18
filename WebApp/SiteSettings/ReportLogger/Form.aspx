<%@ Page Title="Relatórios emitidos" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.WesPage" %>
   
<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
     
      <asp:Content ID="Content1" ContentPlaceHolderID="Main" Runat="Server">
    <div class="row">
        <wes:AjaxForm runat="server" ID="DETALHESDAEMISSODORELATRIO" Title="Detalhes da emissão do relatório" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="" ChromeState="Normal" CanDelete="False" CanUpdate="False" CanInsert="False" EntityViewName="Z_LOGRELATORIOSEMITIDOS.FORM" FormMode="ReadOnly" IncludeRecordInRecentItems="False" UserDefinedCommandsVisible="True" PageId="PAGE_REPORTLOGGER_FORM" Level="15" Order="10"  />
        </div>
    
      </asp:Content>
    