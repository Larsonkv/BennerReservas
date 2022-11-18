<%@ Control Language="C#" AutoEventWireup="true" Inherits="Benner.Tecnologia.Wes.Components.WebApp.ErrorSectionControl" %>

<div class="error-page">
            <div class="m-heading-1 border-red m-bordered">

    <div class="row">
        <div class="col-md-12 title">
            <div class="emoticon font-red">: o</div>
            <div class="details">
                <h2>ps, ocorreu um problema</h2>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
                <p>
                    <asp:Label ID="LblErrorMessage" runat="server" Font-Size="1.4em"></asp:Label>
                </p>
                <p>
                    <asp:Label ID="LblHint" runat="server"></asp:Label>
                </p>
                <asp:PlaceHolder ID="PhStackTrace" runat="server">
                    <asp:PlaceHolder ID="PhContainer" runat="server" />
                    <p>
                        <asp:Label ID="LblGuid" runat="server"></asp:Label>
                    </p>
                    <p>
                        <asp:Label ID="LblUrl" runat="server"></asp:Label>
                    </p>
                </asp:PlaceHolder>
                <asp:PlaceHolder ID="ErrorCmdsContainer" runat="server"></asp:PlaceHolder>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(function () {
        $("body").keyup(function (e) {
            if (e.keyCode == 27) // esc
            {
                if (parent != null)
                    parent.Benner.ModalPage.hide();
                else
                    Benner.ModalPage.hide();

                return false;
            }
        });
    });
</script>