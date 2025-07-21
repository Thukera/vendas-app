export const converteEmBigDecimal = (value : string) : number => {
    console.log("Convert Bit Decimal: " + value)
    if(!value){
        return 0;
    }

    let convertedValue = parseFloat(value.replace(".","").replace(",","."));
    console.log("Converted :" + convertedValue);
    return convertedValue;
}



export const formatReal = (valor: any): string => {
  const onlyNumbers = String(valor).replace(/\D/g, '');
  const v = ((Number(onlyNumbers) / 100).toFixed(2) + '').split('.');

  const m = v[0].split('').reverse().join('').match(/.{1,3}/g);

  if (!m) return '0,00';

  for (let i = 0; i < m.length; i++) {
    m[i] = m[i].split('').reverse().join('');
  }

  const r = m.reverse().join('.');

  return r + ',' + v[1];
} 

/*   export const formatReal = (valor: string | number): string => {
  const num = typeof valor === 'string' ? parseFloat(valor) : valor;
  return num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).replace('R$', '').trim();
}; */
