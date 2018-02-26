import * as d3 from 'd3';

export const getContext = (parentSelector) => {
    return document.querySelector(parentSelector + " canvas").getContext('2d')
}

export const clearContext = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
}

export const addCanvas = (parentSelector, width, height) => {
    d3.selectAll(parentSelector)
        .append("canvas")
        .attr("width", width)
        .attr("height", height)
        .style("display", "block")
}

export const canvas = {
    getContext,
    clearContext,
    addCanvas
}