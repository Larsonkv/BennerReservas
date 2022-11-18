<%@ Assembly Name="Benner.Tecnologia.Wes.Components.WebApp" %>
<%@ Control Language="C#" AutoEventWireup="true" Inherits="Benner.Tecnologia.Wes.Components.WebApp.uc.RegistryFilterConditionControl" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components.UI" TagPrefix="wes" %>

<asp:UpdatePanel ID="updatePanelReportFilter" UpdateMode="Always" runat="server">
    <ContentTemplate>
        <div class="portlet light ignore-autofocus">
            <div class="portlet-title">
                <div class="caption">
                    <asp:Label runat="server" ID="lblConditions" CssClass="caption-subject font-green-sharp bold uppercase" Text="Condições" />
                </div>
            </div>
            <div class="portlet-body form">
                <asp:Panel ID="erros" CssClass="alert alert-danger" runat="server" Visible="false">
                    <asp:Label ID="lbErrorMessage" CssClass="" runat="server" Text=""></asp:Label>
                </asp:Panel>
                <asp:LinkButton ID="addConditionButton" CssClass="btn default command-action predef-action" OnClick="AddConditionButton_Click" runat="server"><i class="fa fa-plus btn-action"></i>Adicionar condição</asp:LinkButton>
                <div class="table-responsive table-scroll filter-control">
                    <asp:Table ID="tbConditions" runat="server" CssClass="registryfilter-conditions" />
                </div>
            </div>
            <div class="legend-filter">
                <span class="box bg-filter-parent"></span>
                Tabela acima
                        <div class="label-title-help">
                            <i class="fa fa-question-circle help-tooltip" data-original-title="São tabelas que dentro da entidade em questão apontam para outras tabelas e possibilitam filtrar dentro dos campos da tabela destino"></i>
                        </div>
            </div>
            <div class="legend-filter">
                <span class="box bg-filter-child"></span>
                Tabela abaixo                        
                        <div class="label-title-help">
                            <i class="fa fa-question-circle help-tooltip" data-original-title="São tabelas que apontam para a entidade em questão"></i>
                        </div>
            </div>
        </div>
    </ContentTemplate>
</asp:UpdatePanel>
