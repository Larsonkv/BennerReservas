<%@ Page Title="LGPD" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.WesPage" %>
   
<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
     
      <asp:Content ID="Content1" ContentPlaceHolderID="Main" Runat="Server">
    <div class="row">
    <wes:AjaxForm runat="server" ID="FORMZ_LGPD_TABELAS" Title="Tabela de pessoas" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="" ChromeState="Normal" CanDelete="True" CanUpdate="True" CanInsert="True" EntityViewName="Z_LGPD_TABELAS.FORM" FormMode="ReadOnly" IncludeRecordInRecentItems="True" UserDefinedCommandsVisible="True" PageId="SITESETTINGS_LGPD_ZLGPDTABELAS_FORM" Level="15" Order="100"  />
      <div class="col-md-12"><div class="portlet light">
    <div class="tabbable-line">
      <ul class="nav nav-tabs">
        <li onclick="Benner.Page.changeSelectedTab(this)" data-widget-id="CAMPOS_1" class="active"><a data-toggle="tab" href="#tabCAMPOS_1"><%= Benner.Tecnologia.Wes.Components.LanguageTranslator.Translate(@"Campos")%></a></li>
        <li onclick="Benner.Page.changeSelectedTab(this)" data-widget-id="CHAVESDEPESQUISA"><a data-toggle="tab" href="#tabCHAVESDEPESQUISA"><%= Benner.Tecnologia.Wes.Components.LanguageTranslator.Translate(@"Chaves de pesquisa")%></a></li>
        <li onclick="Benner.Page.changeSelectedTab(this)" data-widget-id="TABELASDETALHE"><a data-toggle="tab" href="#tabTABELASDETALHE"><%= Benner.Tecnologia.Wes.Components.LanguageTranslator.Translate(@"Tabelas detalhe")%></a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active" id="tabCAMPOS_1">
                    <div class="row">
    <wes:SimpleGrid runat="server" ID="CAMPOS_1" Title="Campos" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="false" ProviderWidgetUniqueId="FORMZ_LGPD_TABELAS" ChromeState="Fixed" CanDelete="True" CanUpdate="True" CanInsert="True" EntityViewName="Z_LGPD_CAMPOS.GRID" Mode="Selectable" UserDefinedSelectColumnVisible="False" UserDefinedPageSize="10" SystemFilterOnly="False" DisplayRowCommand="True" CompanyFilterMode="OnlyCompany" UserDefinedCriteriaWhereClause="A.TABELA = @CAMPO(TABELA) AND A.CAMADA = @CAMPO(CAMADA)" FormUrl="~/SiteSettings/LGPD/ZLgpdCampos/Form.aspx" ShowExport="True" UserDefinedDisableRowSelection="False" PageId="SITESETTINGS_LGPD_ZLGPDTABELAS_FORM" Level="15" Order="110"  /></div>
        </div>
        <div class="tab-pane" id="tabCHAVESDEPESQUISA">
                    <div class="row">
    <wes:EditableGrid runat="server" ID="CHAVESDEPESQUISA" Title="Chaves de pesquisa" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="false" ProviderWidgetUniqueId="FORMZ_LGPD_TABELAS" ChromeState="Minimized" CanDelete="True" CanUpdate="True" CanInsert="True" EntityViewName="Z_LGPD_CAMPOSCHAVE.GRID" Mode="Selectable" UserDefinedSelectColumnVisible="False" UserDefinedPageSize="10" SystemFilterOnly="False" DisplayRowCommand="True" CompanyFilterMode="OnlyCompany" UserDefinedCriteriaWhereClause="A.TABELA = @CAMPO(TABELA) AND A.CAMADA = @CAMPO(CAMADA)" ShowExport="True" PageId="SITESETTINGS_LGPD_ZLGPDTABELAS_FORM" Level="15" Order="120"  /></div>
        </div>
        <div class="tab-pane" id="tabTABELASDETALHE">
                    <div class="row">
    <wes:SimpleGrid runat="server" ID="TABELASDETALHE" Title="Tabelas detalhe" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="false" ProviderWidgetUniqueId="FORMZ_LGPD_TABELAS" ChromeState="Minimized" CanDelete="True" CanUpdate="True" CanInsert="True" EntityViewName="Z_LGPD_RELACIONAMENTOS.GRID" Mode="Selectable" UserDefinedSelectColumnVisible="False" UserDefinedPageSize="10" SystemFilterOnly="False" DisplayRowCommand="True" CompanyFilterMode="OnlyCompany" UserDefinedCriteriaWhereClause="A.TABELA = @CAMPO(TABELA) AND A.CAMADA = @CAMPO(CAMADA)" FormUrl="~/SiteSettings/LGPD/ZLgpdTabelas/TabelasDetalhe.aspx" ShowExport="True" UserDefinedDisableRowSelection="False" PageId="SITESETTINGS_LGPD_ZLGPDTABELAS_FORM" Level="15" Order="130"  /></div>
        </div>
      </div>
    </div>
  </div>
</div></div>
      </asp:Content>
    