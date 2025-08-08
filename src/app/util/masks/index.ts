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


export const formatCEP = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d)/, '$1-$2')
    .substring(0, 9); // XXXXX-XXX
};

export const formatCNPJ = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .substring(0, 18); // XX.XXX.XXX/XXXX-XX
};

export const formatCPF = (value: string): string => {
  return value
    .replace(/\D/g, '')                     // Remove all non-digit characters
    .replace(/(\d{3})(\d)/, '$1.$2')        // XXX.XXX
    .replace(/(\d{3})(\d)/, '$1.$2')        // XXX.XXX.XXX
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')  // XXX.XXX.XXX-XX
    .substring(0, 14);                      // Max length: 14 chars
};

export const formatDate = (value: string): string => {
  return value
    .replace(/\D/g, '')                      // Remove non-digits
    .replace(/(\d{2})(\d)/, '$1/$2')         // dd/MM
    .replace(/(\d{2})(\d)/, '$1/$2')         // dd/MM/yyyy
    .substring(0, 10);                       // Limit length to 10
};

export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};