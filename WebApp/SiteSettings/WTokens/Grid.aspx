<%@ Page Title="Tokens de acesso à APIs" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.WTokensPage" %>

<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Main" runat="Server">
    <style>
        .nowrap{
            white-space:nowrap;
        }
    </style>
    <div class="row">
        <wes:SimpleGrid runat="server" ID="gridTokens" Title="Tokens" Subtitle="" PortletCssClass="" PortletLayout="Default" BootstrapCols="12" FontIcon="" ShowTitle="true" ProviderWidgetUniqueId="" ChromeState="Normal" CanDelete="True" CanUpdate="False" CanInsert="False" EntityViewName="W_TOKENS.GRID" Mode="Selectable" UserDefinedSelectColumnVisible="False" UserDefinedPageSize="10" SystemFilterOnly="False" DisplayRowCommand="True" CompanyFilterMode="OnlyCompany" ShowExport="False" UserDefinedDisableRowSelection="False" PageId="PAGES_WTOKENS_GRID" Level="15" Order="100" />
    </div>

    <script type="text/javascript">
        function copyToClipboard(text) {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val(text).select();
            document.execCommand("copy");
            $temp.remove();

            toastr.success('Copiado para área de transferência!');
        }
    </script>

</asp:Content>
