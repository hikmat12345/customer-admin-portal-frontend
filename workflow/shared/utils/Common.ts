import { RegexConst } from '../constants';

export function format(fmt: string, ...args: any[]): string {
  if (!fmt.match(RegexConst.stringFormat)) {
    throw new Error(`String invalid format string. ${fmt}`);
  }
  return fmt.replace(RegexConst.stringArg, (_m: string, str, index) => {
    if (str) {
      return str.replace(RegexConst.stringArgFormat, (m1: string) => m1[0]);
    }
    if (index >= args.length) {
      throw new Error(`String argument index is out of range in format ${index}`);
    }
    return args[index];
  });
}

export function lowercaseWithReplaceWhitespace(value: string = ''): string {
  return value
    ?.toLowerCase()
    .replace(' ', '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
