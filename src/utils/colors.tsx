/**
 * * Global color configurations
 */

import { Quest } from "../types"
export type MarkerColor = Quest['color'];
export type FunctionalColor = 'success' | 'link' | 'error' | 'warn';



export const markColorMap = createColorMap<MarkerColor>(
    ['gray', 'red', 'orange', 'green', 'blue', 'purple'], '--clr-mk-');


export const funcColorMap = createColorMap<FunctionalColor>(
    ['success', 'link', 'error', 'warn'], '--clr-fn-');


function createColorMap<T extends string>(suffixArray: T[], prefix: string): Record<T, string> {
    const colorMap: Record<T, string> = {} as any;
    suffixArray.forEach((elem) => {
        Object.assign(colorMap, { [elem]: `var(${prefix}${elem})` });
    });
    return colorMap;
}