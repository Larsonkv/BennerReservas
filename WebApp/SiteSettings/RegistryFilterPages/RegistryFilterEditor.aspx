<%@ Page Title="Editor de filtro" Language="C#"
    Inherits="Benner.Tecnologia.Wes.Components.WebApp.SiteSettings.RegistryFilterPages.RegistryFilterEditorPage"%>

<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components.WebControls" TagPrefix="cc1" %>
<%@ Register Src="~/uc/RegistryFilterConditionControl.ascx" TagName="reportfilterCondition" TagPrefix="wesUserControls" %>
<%@ Register Src="~/uc/EntityViewHeader.ascx" TagName="EntityViewHeader" TagPrefix="wesUserControl" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Main" runat="Server">
    <div class="portlet light">
        <div class="portlet-title">
            <div class="caption">
                <asp:Label runat="server" ID="lblTituloEditorDeFiltro" CssClass="caption-subject font-green-sharp bold uppercase" Text="Editor de filtro" />
            </div>
        </div>
        <div class="portlet-body form">
            <asp:UpdatePanel ID="filterEditorUpdatePanel" runat="server" UpdateMode="Always">
                <ContentTemplate>
                    <div class="form-actions nobg no-border commands-bar fluid">
                        <asp:LinkButton ID="lnkBtnSave" OnClick="ButtonSave_Click" CssClass="btn blue command-action predef-action" runat="server"><i class="fa fa-check btn-action"></i>Salvar</asp:LinkButton>
                        <asp:LinkButton ID="lnkBtnDelete" OnClick="ButtonDelete_Click" Enabled="false" CssClass="btn red command-action predef-action" runat="server"><i class="fa fa-minus btn-action"></i>Excluir</asp:LinkButton>
                        <asp:LinkButton ID="lnkBtnCancel" OnClick="ButtonCancel_Click" CssClass="btn grey-silver command-action predef-action" runat="server"><i class="fa fa-times btn-action"></i>Cancelar</asp:LinkButton>
                    </div>
                    <cc1:MessagePanel ID="messagePanel" runat="server">
                    </cc1:MessagePanel>
                    <div class="row">
                        <div class="col-md-8">
                            <div class="form-group">
                                <asp:Label runat="server" ID="lblTituloNomeFiltro" CssClass="control-label" Text="Nome do filtro" />
                                <asp:TextBox ID="txFilterName" class="form-control filter-name" CausesValidation="true" runat="server" MaxLength ="190"/>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <div class="form-group">
                                <asp:Label runat="server" ID="lblTituloSQLEspecial" CssClass="control-label" Text="SQL Especial" />
                                <asp:TextBox ID="txSqlSpecial" class="form-control filter-name" CausesValidation="true" runat="server" TextMode="MultiLine" Rows="5" />
                            </div>
                            <asp:CheckBox ID="cbAllUsers" runat="server" Text="Utilizado por todos usu&#225rios" />
                        </div>
                    </div>
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </div>
     <wesUserControls:reportfilterCondition ID="reportfilterCondition" runat="server" />
</asp:Content>
