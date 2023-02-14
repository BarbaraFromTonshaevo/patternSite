"use strict";



// Открыть окна
document.querySelectorAll("[data-window]").forEach(function(item){
	item.addEventListener("click", function(e){
        e.preventDefault();
		let windowId = item.getAttribute("data-window");
		document.querySelector("#"+windowId+"").classList.add("active");
	});
});
// Закрыть окна
document.querySelectorAll(".window__container").forEach(function(item){
	item.addEventListener("click", function(e){
		if(e.target.matches(".window__container") || e.target.matches(".window__close")){
			item.classList.remove("active");
		};
	});
});

// Обенуть таблицы
if(window.innerWidth < 768){
	let contentTable = document.querySelectorAll(".content table");
	if(contentTable){
		contentTable.forEach(function(item){
			let tableWrap = document.createElement('div');
			tableWrap.setAttribute("class", "table-wrap");
			item.parentNode.insertBefore(tableWrap, item);
			tableWrap.appendChild(item);
		});
	};
};

//Блок со скрытым текстом
const textHiddenBlocks = document.querySelectorAll('.text-hidden');
if(textHiddenBlocks.length > 0){
	textHiddenBlocks.forEach((textHidden)=>{
		const itemContent = textHidden.querySelector('.text-hidden-content');
		let heightOld = itemContent.clientHeight + 'px';

		textHidden.querySelector('.text-hidden-btn').addEventListener('click',()=>{
			textHidden.classList.toggle('open');
			if(textHidden.classList.contains('open')){
				itemContent.style.height = 'auto';
				let heightNew = itemContent.clientHeight + 'px';
				itemContent.style.height = heightOld;
				setTimeout(function () {
					itemContent.style.height = heightNew;
				}, 0);
			}
			else{
				itemContent.style.height = heightOld;
			}
		});
	});
} 