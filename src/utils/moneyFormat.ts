export function moneyFormater(valor: number | string): string {
    let valorNumerico = typeof valor === "string" ? parseFloat(valor.replace(/[^0-9,.-]+/g, "").replace(",", ".")) : valor;

    if (isNaN(valorNumerico)) {
        return "0,00";
    }

    const valorFormatado = valorNumerico
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${valorFormatado}`;
}
