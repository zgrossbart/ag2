/*******************************************************************************
 *
 * MIT License
 * Copyright (c) 2015-2016 NetIQ Corporation, a Micro Focus company
 *
 ******************************************************************************/
'use strict';
var gromit_grid;
(function (gromit_grid) {
    var hasDrawn = false;
    var windowWidth = 0;
    var cellWidth = 250;
    var cellHeight = 150;
    var padding = 30;
    var gridOffset = 0;
    var inResize = false;
    var Cell = (function () {
        function Cell() {
        }
        return Cell;
    }());
    /**
     * Adds a specific cell to the set of used cells.  Used cells are skipped
     * when laying cells out in the future.
     *
     * @param usedCells the array of used cells
     * @param col       the column of the used cell
     * @param row       the row of the used cell
     */
    function setUsed(usedCells, col, row) {
        var index = usedCells.length;
        usedCells[index] = { left: col, top: row };
    }
    /**
     * Lets you know if a specific column and row index has already been used.
     *
     * @param usedCells the array of used cells
     * @param col       the column of the cell to check
     * @param row       the row of the cell to check
     */
    function isUsed(usedCells, col, row) {
        for (var i = 0; i < usedCells.length; i++) {
            if (usedCells[i].left === col &&
                usedCells[i].top === row) {
                return true;
            }
        }
        return false;
    }
    /**
     * Applies the styling to a specific cell.
     *
     * @param cell       The JQuery object representing the cell to style
     * @param x          the left position of the cell in pixels
     * @param y          the top position of the cell in pixels
     * @param cellWidth  the width of the cell in pixels
     * @param cellHeight the height of the cell in pixels
     * @param animate    true if this style should be animated and false otherwise
     */
    function styleCell(cell, x, y, cellWidth, cellHeight, animate) {
        if (animate) {
            cell.animate({
                left: x + 'px',
                top: y + 'px'
            }, 500, 'swing');
        }
        else {
            cell.css({
                width: cellWidth + 'px',
                height: cellHeight + 'px',
                position: 'absolute',
                left: x + 'px',
                top: y + 'px'
            });
        }
    }
    function bindResize() {
        $(window).bind('resize', function () {
            if (!inResize && windowWidth !== $(window).width()) {
                inResize = true;
                setTimeout(function () {
                    alignGrid(cellWidth, cellHeight, padding, gridOffset);
                    windowWidth = $(window).width();
                    inResize = false;
                }, 500);
            }
        });
    }
    function alignGrid(cWidth, cHeight, cPadding, cGridOffset) {
        cellWidth = cWidth;
        cellHeight = cHeight;
        padding = cPadding;
        gridOffset = cGridOffset;
        var x = padding / 2;
        var y = 0;
        var count = 1;
        /*
         * When we add a "bigcell" to the grid it takes up four cells instead of one.
         * That makes we need to not add any other cells to those areas or the cells
         * will overlap.  These three variables are used to remember the cells used
         * by big cells.
         */
        var curCol = 0;
        var curRow = 0;
        var usedCells;
        $('.slidegrid').each(function () {
            var hasTallCell = false;
            var cols = Math.floor(($(this).parent().parent().width()) / ((cellWidth + padding)));
            $(this).css('position', 'relative');
            var children = $(this).children('div');
            for (var i = 0; i < children.length; i++) {
                if (children.eq(i).hasClass('bigcell')) {
                    if (curCol > 0 && curCol === cols - 1) {
                        /*
                         * This means it is time to bump down to the next row because this cell
                         * is too wide to fit in the one remaining space in the current row
                         */
                        curCol = 0;
                        curRow++;
                        x = padding / 2;
                        y += cellHeight + padding;
                        count++;
                    }
                    if (cols > 1 && (isUsed(usedCells, curCol, curRow) ||
                        isUsed(usedCells, curCol + 1, curRow) ||
                        isUsed(usedCells, curCol + 1, curRow + 1) ||
                        isUsed(usedCells, curCol, curRow + 1))) {
                        /*
                         * If the current cell is used we
                         * just want to try the next column.
                         * However, we also want to bump to
                         * the next row if needed so we are
                         * calling the column logic and then
                         * backing up the counter.
                         */
                        i--;
                    }
                    else {
                        styleCell(children.eq(i), x, y, (cellWidth * 2) + padding, (cellHeight * 2) + padding, hasDrawn);
                        /*
                         * Big cells are twice as large as normal cells.  That means they
                         * use up the cell to the right, the cell below, and the cell to
                         * the right and below.
                         */
                        setUsed(usedCells, curCol, curRow);
                        setUsed(usedCells, curCol + 1, curRow);
                        setUsed(usedCells, curCol, curRow + 1);
                        setUsed(usedCells, curCol + 1, curRow + 1);
                    }
                    hasTallCell = true;
                }
                else if (children.eq(i).hasClass('widecell')) {
                    if (isUsed(usedCells, curCol, curRow) ||
                        isUsed(usedCells, curCol + 1, curRow) ||
                        (cols > 1 && curCol === cols - 1)) {
                        /*
                         * If the current cell is used we
                         * just want to try the next column.
                         * However, we also want to bump to
                         * the next row if needed so we are
                         * calling the column logic and then
                         * backing up the counter.
                         */
                        i--;
                    }
                    else {
                        styleCell(children.eq(i), x, y, (cellWidth * 2) + padding, cellHeight, hasDrawn);
                        /*
                         * Wide cells are twice as wide, but the same height
                         */
                        setUsed(usedCells, curCol, curRow);
                        setUsed(usedCells, curCol + 1, curRow);
                    }
                }
                else if (children.eq(i).hasClass('tallcell')) {
                    if (isUsed(usedCells, curCol, curRow) ||
                        isUsed(usedCells, curCol, curRow + 1)) {
                        /*
                         * If the current cell is used we
                         * just want to try the next column.
                         * However, we also want to bump to
                         * the next row if needed so we are
                         * calling the column logic and then
                         * backing up the counter.
                         */
                        i--;
                    }
                    else {
                        styleCell(children.eq(i), x, y, cellWidth, (cellHeight * 2) + padding, hasDrawn);
                        /*
                         * Tall cells are twice as tall, but the same width
                         */
                        setUsed(usedCells, curCol, curRow);
                        setUsed(usedCells, curCol, curRow + 1);
                    }
                    hasTallCell = true;
                }
                else {
                    if (isUsed(usedCells, curCol, curRow)) {
                        /*
                         * If the current cell is used we
                         * just want to try the next column.
                         * However, we also want to bump to
                         * the next row if needed so we are
                         * calling the column logic and then
                         * backing up the counter.
                         */
                        i--;
                    }
                    else {
                        styleCell(children.eq(i), x, y, cellWidth, cellHeight, hasDrawn);
                    }
                }
                if ((count % cols) === 0) {
                    /*
                     * This means it is time to bump down to the next row
                     */
                    curCol = 0;
                    curRow++;
                    x = padding / 2;
                    y += cellHeight + padding;
                    if (i !== children.length - 1) {
                        hasTallCell = false;
                    }
                }
                else {
                    x += cellWidth + padding;
                    curCol++;
                }
                count++;
            }
            /*
             * We need to set a height of the slidegrid div since it only has absolute
             * height tags within it.
             */
            var height = 0;
            if ((count % cols) !== 1) {
                height = y + cellHeight + padding;
            }
            else {
                height = y + padding;
            }
            if (hasTallCell) {
                height += cellHeight + padding;
            }
            $(this).css('height', height + 'px');
            /*
             * Now we reset the variables for the next grid.
             */
            x = padding / 2;
            y = 0;
            count = 1;
            bindResize();
        });
        hasDrawn = true;
    }
    gromit_grid.alignGrid = alignGrid;
})(gromit_grid = exports.gromit_grid || (exports.gromit_grid = {}));
//# sourceMappingURL=slidegrid.js.map