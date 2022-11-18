<%@ Page Title="Consultar logs de rastreamento" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.LogLgpdViewerPage" %>

<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components.UI" TagPrefix="wes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="Main" runat="Server">
    <div class="row">
        <div class="col-md-12 widget  portlet-default">
            <div class="col-md-12 widget  portlet-default" id="portlet_FiltroAjaxForm">
                <span id="spa_filtros">
                    <div style="border-collapse: separate;">
                        <div id="div_filtros" class="filter-search-form note note-info note-bordered">
                            <div id="div_filtros1" class="row">
                                <div id="div_FilterComboboxCol" class="col-lg-3 col-md-2 col-sm-2 col-xs-12">
                                </div>
                                <div id="div_FilterSimpleSearchCol" class="col-lg-11 col-md-10 col-sm-10 col-xs-10 allow-focus">
                                    <div class="input-group filter-simple-search col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <asp:TextBox ID="SharedText" runat="server" onKeyDown="if(event.keyCode==13) CliCkButtom();" placeholder="Pesquisa..." type="text" MaxLength="50" CssClass="form-control" />
                                    </div>

                                </div>
                                <div id="ctl00_Main_FilterControl_FilterActionsCol" class="col-lg-1 col-md-1 col-sm-2 col-xs-12 filter-actions pull-right no-padding-left padding-bottom-15">
                                    <asp:LinkButton ID="ClearButton" runat="server" title="Limpar" class="btn grey-silver btn-filter-clean">
                                    <i class="fa fa-close"></i>
                                    </asp:LinkButton>
                                    <asp:LinkButton ID="SharedButtom" runat="server" CssClass="btn blue filter-button">
                                     <i class="fa fa-search"></i>
                                    </asp:LinkButton>
                                </div>
                                <div id="ctl00_Main_FilterControl_FilterFormCol" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-15">
                                    <div id="ctl00_Main_FilterControl_FilterFormContainer" class="filter-form">
                                        <span data-field="HANDLE" data-label="" data-type="hidden" data-internal-type="number"></span>
                                        <div id="ctl00_Main_FilterControl_GERAL" class="form-body form-horizontal legend-left-caption">
                                            <div class="form-group">
                                                <label class="control-label col-md-2 col-sm-2">
                                                    <div class="label-form">
                                                        <div class="label-title" title="1__NOME">
                                                            Nome do usuário
                                                        </div>
                                                    </div>
                                                </label>
                                                <div class="col-md-4 col-sm-4 value">
                                                    <span data-label="Nome do usuário" data-type="string">
                                                        <asp:TextBox ID="UserNameTextBox" runat="server" onKeyDown="if(event.keyCode==13) CliCkButtom();" placeholder="Pesquisa..." type="text" MaxLength="50" CssClass="form-control" />
                                                    </span>
                                                </div>
                                                <label class="control-label col-md-2 col-sm-2">
                                                    <div class="label-form">
                                                        <div class="label-title" title="2__NOME">
                                                            Titular
                                                        </div>
                                                    </div>
                                                </label>
                                                <div class="col-md-4 col-sm-4 value">
                                                    <span data-label="Titular" data-type="string">
                                                        <asp:TextBox ID="TitularTextBox" runat="server" onKeyDown="if(event.keyCode==13) CliCkButtom();" placeholder="Pesquisa..." MaxLength="50" type="text" CssClass="form-control" />
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label col-md-2 col-sm-2">
                                                    <div class="label-form">
                                                        <div class="label-title" title="1__NOME">
                                                            Data
                                                        </div>
                                                    </div>
                                                </label>
                                                <div class="col-md-4 col-sm-4 value">
                                                    <wes:DateTimeRangeControl ID="RangeControl" runat="server" onKeyDown="if(event.keyCode==13) CliCkButtom();" Visible="true" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>

            </div>
            <wes:SimpleGrid runat="server" ID="LogLGPDGrid" Title="Rastreamento" CanView="false" UserDefinedDisableRowSelection="true" />

        </div>
    </div>
    <script type="text/javascript">

        function CliCkButtom() {
            var link = document.getElementsByClassName('filter-button');
            link.click();

        }
    </script>

</asp:Content>

