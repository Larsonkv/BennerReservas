<%@ Page Title="SYSTEMMONITOR" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.SiteSettings.SystemMonitorPage" %>
   
<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
     
      <asp:Content ID="Content1" ContentPlaceHolderID="Main" Runat="Server">
    <div class="row">
        <wes:AjaxForm runat="server" ID="FORMTV_SYSTEMMONITOR" Title="Configurar monitoramento" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="" ChromeState="Normal" CanDelete="True" CanUpdate="True" CanInsert="True" EntityViewName="TV_SYSTEMMONITOR.FORM" FormMode="ReadOnly" IncludeRecordInRecentItems="True" UserDefinedCommandsVisible="True" PageId="SITESETTINGS_SYSTEMMONITOR_FORM" Level="15" Order="100"  />
        <wes:SimpleGrid runat="server" ID="LOGSDOMONITORAMENTO" Title="Logs do monitoramento" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="" ChromeState="Normal" CanDelete="False" CanUpdate="False" CanInsert="False" EntityViewName="ZSYSTEMMONITOR.DATASOURCE.GRID" Mode="Search" UserDefinedSelectColumnVisible="False" UserDefinedPageSize="10" SystemFilterOnly="False" DisplayRowCommand="False" CompanyFilterMode="OnlyCompany" ShowExport="True" UserDefinedDisableRowSelection="True" PageId="SITESETTINGS_SYSTEMMONITOR_FORM" Level="15" Order="110"  />
        </div>
    
        <script type="text/javascript">
              function copyToClipboard(event){
    let descricao = event.parentNode.parentNode.childNodes[2]
        .title;
          
    let tmp = document.createElement('textarea');
    tmp.value = descricao;
    tmp.setAttribute('readonly', '');
    tmp.style.position = 'absolute';
    tmp.style.left = '-9999px';
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
    toastr.success('Descrição copiada para área de transferência!');
          
}
              </script>
        <style>
              #ctl00_Main_FORMTV_SYSTEMMONITOR_PageControl_GERAL_GERAL .row div:nth-of-type(3) {
  clear: both;
}

span[data-label="segundos"]{
    position: absolute;
    bottom: -35px;
}
              </style>
      </asp:Content>
    