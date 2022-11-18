<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
<%@ Control Language="C#" AutoEventWireup="true" Inherits="Benner.Tecnologia.Wes.Components.WebApp.SqlExplorerControl" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components.WebControls" TagPrefix="cc1" %>
<%@ Register Src="~/uc/SourceEditor.ascx" TagName="sourceEditor" TagPrefix="wesUserControl" %>

<asp:UpdatePanel ID="panel" runat="server" UpdateMode="Always" ChildrenAsTriggers="true">
    <ContentTemplate>
        <wes:ExceptionMessageViewerControl runat="server" ID="_exceptionControl"></wes:ExceptionMessageViewerControl>
        <asp:HiddenField runat="server" ID="currentSql"></asp:HiddenField>
        <asp:HiddenField runat="server" ID="currentPageIndex"></asp:HiddenField>
        <div>
            <asp:LinkButton runat="server" ID="btnExecute" ClientIDMode="Static" Title="Ctrl + Enter" CssClass="btn blue command-action predef-action editable">
                        <i class="fa fa-play"></i> Executar
            </asp:LinkButton>
            <asp:LinkButton runat="server" ID="btnExport" ClientIDMode="Static" OnDataBound="" CssClass="btn green command-action predef-action editable">
                                <i class="fa fa-file-excel-o"></i> Exportar
            </asp:LinkButton>
            <div class="btn-group btn-group btn-group-solid">
                <a id="btnNext" title="Histórico próximo (Ctrl + seta para cima)" class="btn default command-action predef-action editable">
                    <i class="glyphicon glyphicon-arrow-up"></i>
                </a>
                <a id="btnPrevious" title="Histórico anterior (ctrl + seta para baixo)" class="btn default command-action predef-action editable">
                    <i class="glyphicon glyphicon-arrow-down"></i>
                </a>
                <cc1:MessagePanel ID="messagePanel" runat="server"></cc1:MessagePanel>
                <a id="btnClear" title="Limpar histórico" class="btn default command-action predef-action editable">
                    <i class="fa fa-trash"></i>
                </a>
            </div>
        </div>
        <wesUserControl:sourceEditor runat="server" Language="sql" Height="400px" ID="SourceEditor" />
        <asp:HiddenField runat="server" ID="currentOrdination"></asp:HiddenField>
        <div class="table-responsive table-scrollable">
            <asp:GridView runat="server" ID="GridResult" CssClass="table table-hover" AllowPaging="true" AllowSorting="true" OnPageIndexChanging="GridResult_PageIndexChanging"></asp:GridView>
        </div>
        <ul class="pagination">
            <li id="liPreviousPage" runat="server" class="paginate_button previous disabled">
                <asp:LinkButton ID="btnPreviousPage" runat="server" class="disabled" Enabled="false" disabled="disabled" Visible="false" ClientIDMode="Static">
                            <i class="fa fa-angle-left"></i>
                </asp:LinkButton>
            </li>
            <li id="liNextPage" runat="server" class="paginate_button next" tabindex="1">
                <asp:LinkButton ID="btnNextPage" runat="server" class="disabled" Enabled="false" disabled="disabled" Visible="false" ClientIDMode="Static">
                            <i class="fa fa-angle-right"></i>
                </asp:LinkButton>
            </li>
        </ul>
    </ContentTemplate>
    <Triggers>
        <asp:AsyncPostBackTrigger ControlID="btnExecute" />
        <asp:AsyncPostBackTrigger ControlID="btnExport" />
        <asp:AsyncPostBackTrigger ControlID="btnPreviousPage" />
        <asp:AsyncPostBackTrigger ControlID="btnNextPage" />
    </Triggers>
</asp:UpdatePanel>

<script>
    $(function () {
        Benner.Apps.SqlExplorer.init();
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(Benner.Apps.SqlExplorer.initAjax);
    });
</script>
