require('../../js/Extensions.js');
import Grid from '../../js/Grid.js';

var Benner = {};
Benner.Grid = Grid;
window.Benner = Benner;

describe('Teste Grid.js', () => {

    var html = 
    `<div id="GRID_TESTE" class="col-md-12 widget  portlet-default" widget-type="SimpleGrid" widget-uniqueid="ctl00$Main$GRIDDL_CARROS" widget-jsproperties="{}" provider-widget-uniqueid="ctl00$Main$FILTRO" page-id="3863" entity-view-name="DL_CARROS.GRID" widget-order="100">
        <div class="table-responsive table-scrollable">
        <div class="multi-select-message"></div>
            <table class="table table-hover simple-grid" id="GridSimples" style="border-collapse:collapse;">
                <thead>
                    <tr>
                        <th class="multi-select-column" scope="col">
                            <label title="Marcar ou desmarcar todos os itens da página" class="boolean-control mt-checkbox mt-checkbox-outline">
                                <input id="SelectAllCheckBoxHeader" type="checkbox" onclick="Benner.Grid.selectAllRows('GRID_TESTE', 'GridSimples', true);" class="ignore-focus">
                                <span></span>
                            </label>
                        </th>
                        <th class="text-left normal-white-space" scope="col">String</th>
                        <th class="column-numeric text-right normal-white-space" scope="col">Inteiro</th>
                        <th class="column-numeric text-right normal-white-space" scope="col">Numero</th>
                        <th class="column-numeric text-right normal-white-space" scope="col">Valor</th>
                        <th class="text-left normal-white-space export-link" scope="col">Lookup</th>
                    </tr>
                </thead>
                <tbody>
                    <tr rel="0" handle="10" class="">
                        <td class="multi-select-column">
                            <label class="boolean-control mt-checkbox mt-checkbox-outline">
                                <input id="CheckBoxSelectedEntity1" type="checkbox" value="10" onclick="Benner.Grid.selectRow('GRID_TESTE', 'GridSimples', this, true);">
                                <span></span>
                            </label>
                        </td>
                        <td class="text-left item-totalizer"><a>Teste 1</a></td>
                        <td class="text-right item-totalizer" data-type="integer"><a>100</a></td>
                        <td class="text-right item-totalizer" data-type="number" data-m-dec="4" ><a>155,9850</a></td>
                        <td class="text-right item-totalizer" data-type="currency"><a>R$ 1025,00</a></td>
                        <td class="text-left"><a>&nbsp;</a></td>
                    </tr>
                    <tr rel="1" handle="20" class="">
                        <td class="multi-select-column">
                            <label class="boolean-control mt-checkbox mt-checkbox-outline">
                                <input id="CheckBoxSelectedEntity2" type="checkbox" value="20" onclick="Benner.Grid.selectRow('GRID_TESTE', 'GridSimples', this, true);">
                                <span></span>
                            </label>
                        </td>
                        <td class="text-left item-totalizer"><a>Teste 2</a></td>
                        <td class="text-right item-totalizer" data-type="integer"><a>200</a></td>
                        <td class="text-right item-totalizer" data-type="number" data-m-dec="4"><a>29,0009</a></td>
                        <td class="text-right item-totalizer" data-type="currency"><a>R$ 2.889,85</a></td>
                        <td class="text-left"><a>Sandeiro</a></td>
                    </tr>
                    <tr rel="2" handle="30" class="">
                        <td class="multi-select-column">
                            <label class="boolean-control mt-checkbox mt-checkbox-outline">
                                <input id="CheckBoxSelectedEntity3" type="checkbox" value="30" onclick="Benner.Grid.selectRow('GRID_TESTE', 'GridSimples', this, true);">
                                <span></span>
                            </label>
                        </td>
                        <td class="text-left item-totalizer"><a>Teste 3</a></td>
                        <td class="text-right item-totalizer" data-type="integer"><a>300</a></td>
                        <td class="text-right item-totalizer" data-type="number" data-m-dec="4"><a>&nbsp;</a></td>
                        <td class="text-right item-totalizer" data-type="currency"><a>R$ 150,99</a></td>
                        <td class="text-left"><a>&nbsp;</a></td>
                    </tr>
                    <tr rel="3" handle="40">
                        <td class="multi-select-column">
                            <label class="boolean-control mt-checkbox mt-checkbox-outline">
                                <input id="CheckBoxSelectedEntity4" type="checkbox" value="40" onclick="Benner.Grid.selectRow('GRID_TESTE', 'GridSimples', this, true);">
                                <span></span>
                            </label>
                        </td>
                        <td class="text-left item-totalizer"><a>Teste 4</a></td>
                        <td class="text-right item-totalizer" data-type="integer"><a>400</a></td>
                        <td class="text-right item-totalizer" data-type="number" data-m-dec="4"><a>999,8978</a></td>
                        <td class="text-right item-totalizer" data-type="currency"><a>R$ 15,89</a></td>
                        <td class="text-left"><a>Peugeot 206</a></td>
                    </tr>
                    <tr class="totalizer-row">
                        <td>&nbsp;</td>
                        <td title="Contador" class="text-left totalizer-cell" data-field="STRING" data-totalizer="Count" data-value-db="13">13</td>
                        <td title="Soma" class="text-right totalizer-cell" data-field="INTEIRO" data-totalizer="Sum" data-value-db="9500" data-type="integer">9500</td>
                        <td title="Média" class="text-right totalizer-cell" data-field="NUMERO" data-totalizer="Average" data-value-db="1.424.138,4293" data-type="number" data-m-dec="4">1.424.138,4293</td>
                        <td title="Valor máximo" class="text-right totalizer-cell" data-field="VALOR" data-totalizer="Max" data-value-db="R$ 2.889,85" data-type="currency">R$ 2.889,85</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
            <input type="hidden" name="ctl00$Main$GRIDDL_CARROS$SelectHandlesInput_GRIDDL_CARROS" id="SelectHandlesInput_GRID_TESTE">
            <input type="hidden" name="ctl00$Main$GRIDDL_CARROS$HandlesInThisPagination_GRIDDL_CARROS" id="HandlesInThisPagination_GRID_TESTE" value="10|20|30|40">
            <input type="hidden" name="ctl00$Main$GRID_TESTE$RowsTotalizerInput_GRID_TESTE" id="RowsTotalizerInput_GRID_TESTE">
        </div>        
    </div>`;

    it("Validar a seleção de row e se os totalizadores estão sendo atualizados conforme selecionado as linhas", () => {
        document.body.innerHTML = html;
        
        $("#CheckBoxSelectedEntity1").click();
        let columns = document.querySelectorAll(".table.simple-grid .totalizer-row td");
        expect(columns[1].textContent).toBe("1");
        expect(columns[2].textContent).toBe("100");
        expect(columns[3].textContent).toBe("155.9850");
        let selectedHandles = $('#SelectHandlesInput_GRID_TESTE').val();
        expect(selectedHandles).toBe("10");

        let valueFormat = 1025.00.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });
        expect(columns[4].textContent).toBe(valueFormat);
        
        $("#CheckBoxSelectedEntity2").click();
        columns = document.querySelectorAll(".table.simple-grid .totalizer-row td");
        expect(columns[1].textContent).toBe("2");
        expect(columns[2].textContent).toBe("300");
        expect(columns[3].textContent).toBe("92.4930");
        selectedHandles = $('#SelectHandlesInput_GRID_TESTE').val();
        expect(selectedHandles).toBe("10|20");

        valueFormat = 2889.85.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });
        expect(columns[4].textContent).toBe(valueFormat);

        $("#CheckBoxSelectedEntity4").click();
        columns = document.querySelectorAll(".table.simple-grid .totalizer-row td");
        expect(columns[1].textContent).toBe("3");
        expect(columns[2].textContent).toBe("700");
        expect(columns[3].textContent).toBe("394.9612");
        expect(columns[4].textContent).toBe(valueFormat);
        selectedHandles = $('#SelectHandlesInput_GRID_TESTE').val();
        expect(selectedHandles).toBe("10|20|40");

        $("#CheckBoxSelectedEntity4").click();
        selectedHandles = $('#SelectHandlesInput_GRID_TESTE').val();
        expect(selectedHandles).toBe("10|20");
        $("#CheckBoxSelectedEntity2").click();
        selectedHandles = $('#SelectHandlesInput_GRID_TESTE').val();
        expect(selectedHandles).toBe("10");
        $("#CheckBoxSelectedEntity1").click();
        selectedHandles = $('#SelectHandlesInput_GRID_TESTE').val();
        expect(selectedHandles).toBe("");
        columns = document.querySelectorAll(".table.simple-grid .totalizer-row td");
        expect(columns[1].textContent).toBe("13");
        expect(columns[2].textContent).toBe("9500");
        expect(columns[3].textContent).toBe("1.424.138,4293");
        expect(columns[4].textContent).toBe("R$ 2.889,85");
    });

    it("Validar se o selecionar todos as linhas estão funcionando", () => {
        document.body.innerHTML = html;
        
        $("#SelectAllCheckBoxHeader").click();
        let columns = document.querySelectorAll(".table.simple-grid .totalizer-row td");
        expect(columns[1].textContent).toBe("4");
        expect(columns[2].textContent).toBe("1000");
        expect(columns[3].textContent).toBe("394.9612");

        let valueFormat = 2889.85.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });
        expect(columns[4].textContent).toBe(valueFormat);

        $("#SelectAllCheckBoxHeader").click();
        columns = document.querySelectorAll(".table.simple-grid .totalizer-row td");
        expect(columns[1].textContent).toBe("13");
        expect(columns[2].textContent).toBe("9500");
        expect(columns[3].textContent).toBe("1.424.138,4293");
        expect(columns[4].textContent).toBe("R$ 2.889,85");
    })
});