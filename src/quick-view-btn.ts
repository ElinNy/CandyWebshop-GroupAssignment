export function showBtn(){
    const quickView = document.querySelectorAll<HTMLElement>("#quick-view");
    quickView.forEach(quick => {
        let temp1 = quick.querySelector('.quickviewBtn');
        let temp2 = quick.querySelector('#filter');
        quick.addEventListener('mouseover', () => {
            temp1!.classList.remove('hide');
            temp2!.classList.toggle('filter');
        });
        quick.addEventListener('mouseout', () => {
            temp1!.classList.add('hide');
            temp2!.classList.toggle('filter');
        });
    });
}