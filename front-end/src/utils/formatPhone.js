export default function formatPhone(phoneNumber) {
  return phoneNumber
    .replace(/\D/g, '') // \D represent digits [0-9]
    .replace(/^(\d{2})\B/, '($1) ')
    .replace(/(\d{1})?(\d{4})(\d{4})/, '$1$2-$3');
}

/*
  regex overview:

  \d -> represents all digits (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
  uppercase d (D) -> negation, searchs for everything that isn't a digit
  g -> global, searchs all occurrences

  first replace: replaces everything that is not a digit for a an empty string ('')

  ^ -> apply the rules on the start of the string
  (\^d{2}) -> identifier for the first 2 digits of the start of the string ($1)

  second replace: replaces the first 2 digits to a string like this -> '(XX) '

  ? -> optional character

  third replace: after the first 2 digits, will check if the number has 9 or 8
  digits, if 8, will transform into XXXX-XXXX, if 9, will transform into XXXXX-XXXX
*/
