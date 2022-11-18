var MultiSelect = {};

MultiSelect.Init = function () {

	$('.mt-multiselect.must-be-loaded').each( () => {
		$(this).removeClass('must-be-loaded')
		
	}).multiselect({
		buttonWidth: '100%',
		includeSelectAllOption: 'true',
		buttonClass: 'mt-multiselect btn btn-default form-control',
		nonSelectedText: 'Nenhum item selecionado',
		selectAllText: 'Selecionar todos',
		nSelectedText: ' itens selecionados',
		allSelectedText: 'Selecionado todos os itens'

	});
}
export default MultiSelect;