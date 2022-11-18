<%@ Page Title="Pesquisar" Language="C#" Inherits="Benner.Tecnologia.Wes.Components.WebApp.DefaultLookupSearch" %>

<%@ Register Assembly="Benner.Tecnologia.Wes.Components.WebApp" Namespace="Benner.Tecnologia.Wes.Components.WebApp" TagPrefix="wes" %>
<%@ Register Assembly="Benner.Tecnologia.Wes.Components" Namespace="Benner.Tecnologia.Wes.Components" TagPrefix="wes" %>
<%@ Register Src="~/uc/HeadSection.ascx" TagName="HeadSection" TagPrefix="wes" %>
<%@ Register Src="~/uc/WesManager.ascx" TagName="WesManager" TagPrefix="wes" %>

<!doctype html>
<html lang="pt" class="no-js">
<head runat="server">
    <wes:HeadSection runat="server" />
    <title>Lookup</title>
    <style>
        .environment, .portlet-title {
            display: none;
        }
    </style>
</head>
<body class="lookup-search bg-white allow-focus">
    <div class="col-md-12">
        <form id="formMain" runat="server">
            <wes:WesManager ID="WesManager1" runat="server">
            </wes:WesManager>
            <asp:HiddenField runat="server" ClientIDMode="Static" ID="currentEntityFields" />
            <asp:updatepanel runat="server" updatemode="Always" xmlns:asp="http://www.asp.net">
				<ContentTemplate>
					<asp:HiddenField runat="server" ClientIDMode="Static" ID="allEntitiesInTable" />
				</ContentTemplate>
			</asp:updatepanel>
            <div class="search-panel">
                <wes:LookupSearchGrid
                    runat="server"
                    ID="Resultado"
                    Title="Pesquisa"
                    ShowExport="false"
                    UserDefinedDisableRowSelection="True"
                    FormUrl=""
                    UserDefinedCriteriaWhereClause=""
                    UserDefinedDataSourceParameters=""
                    DisplayRowCommand="False"
                    SystemFilterOnly="False"
                    UserDefinedPageSize="10"
                    Mode="Selectable"
                    UserDefinedSelectColumnVisible="false"
                    DefaultFilterName=""
                    ShowTitle="False"
                    EntityViewName=""
                    PortletLayout="None"
                    HideDeveloperCommands="true" />
            </div>
        </form>
    </div>
    <script type="text/javascript">
        $(function () {
            parent.Benner.Apps.CustomLookup.init();

            var prm = Sys.WebForms.PageRequestManager.getInstance();
            prm.add_endRequest(function (sender, args) {
                Benner.Apps.CustomLookup.applyAllTableSelectedOnTargetControl();
            });
        });
    </script>
</body>
</html>
