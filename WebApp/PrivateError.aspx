<%@ Page Language="C#" AutoEventWireup="true" Inherits="Benner.Tecnologia.Wes.Components.WebApp.ErrorPage" %>
<%@ Register Src="~/uc/ErrorSection.ascx" TagName="EntityFieldListControl" TagPrefix="wes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Main" runat="Server">

    <style type='text/css'>
        #ContentPanel {
            background: #fff;
        }
    </style>

    <wes:EntityFieldListControl ID="ErrorSectionControl" runat="server" />

</asp:Content>


