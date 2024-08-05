
export function initCustomSelect() {
	document.getElementById('custom-select-button').addEventListener('click', function() {
			var options = document.getElementById('custom-select-options');
			options.classList.toggle('hidden');
	});

	document.querySelectorAll('#custom-select-options li').forEach(function(option) {
			option.addEventListener('click', function() {
					var selectedText = this.querySelector('.block.truncate').textContent;
					var selectedIconSrc = this.querySelector('img').src;
					var selectedValue = this.getAttribute('data-value');

					document.getElementById('selected-text').textContent = selectedText;
					document.getElementById('selected-icon').src = selectedIconSrc;
					document.getElementById('hidden-select').value = selectedValue;

					document.getElementById('custom-select-options').classList.add('hidden');
			});
	});

	document.addEventListener('click', function(event) {
			var isClickInside = document.getElementById('custom-select-button').contains(event.target) || document.getElementById('custom-select-options').contains(event.target);

			if (!isClickInside) {
					document.getElementById('custom-select-options').classList.add('hidden');
			}
	});
}
