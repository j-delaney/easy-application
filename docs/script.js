$(document).ready(function(e) {
	var companies = [];
	var countries = {};
	$.get('https://raw.githubusercontent.com/j-delaney/easy-application/master/README.md', function(response) {
		var data = response.split('\n| Company Name | Location |\n| --- | --- |\n')
		$('#placeholder').html(markdown.toHTML( data[0] ));

		data[1].split('\n').forEach(function(item) {
			var row = item.split(' | ');
			var company = {};
			var trClasses = ['company'];
			company.title = markdown.toHTML(row[0].replace(/\|/g, '').trim());
			company.countries = row[1] ? row[1].replace(/\|/g, '').trim().split('; ') : [];

			company.countries.map(function(item) {
				var place = {
					name: item,
					class: item.replace(/[\W]/g, '-')
				}
				trClasses.push(place.class);
				countries[place.class] = place;
			});
			companies.push(company);
			$('#list > tbody').append('<tr class="'+trClasses.join(' ')+'"><td>'+ company.title
				+'</td><td><p>'+
				company.countries.join('</p><p>')
				+'</p></td></tr>')
		});
    $('.company a').prop('target', '_blank');
		$('#filter').append('<option value="company">All</option>');
		Object.keys(countries).map(function(item) {
			$('#filter').append('<option value="'+countries[item].class+'">'+countries[item].name+'</option>')
		})
	})

	$('#filter').on('change', function(e) {
		$('.company')
			.hide();
		$('.company.'+$(this).val())
			.show();
	})
})
