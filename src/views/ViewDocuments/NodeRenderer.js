import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isDescendant } from 'react-sortable-tree';
import { ReactComponent as ArrowRight } from '../../assets/arrow_right.svg'
import { ReactComponent as ArrowDown } from '../../assets/arrow_down.svg'

// https://github.com/frontend-collective/react-sortable-tree/blob/master/src/node-renderer-default.js
// refer to above on how to change

class NodeRendererDefault extends Component {
    render() {
        const {
            scaffoldBlockPxWidth,
            toggleChildrenVisibility,
            connectDragPreview,
            connectDragSource,
            isDragging,
            canDrop,
            canDrag,
            node,
            title,
            subtitle,
            draggedNode,
            path,
            treeIndex,
            isSearchMatch,
            isSearchFocus,
            buttons,
            className,
            style,
            didDrop,
            treeId,
            isOver, // Not needed, but preserved for other renderers
            parentNode, // Needed for dndManager
            rowDirection, // eslint-disable-next-line
            ...otherProps
        } = this.props;
        const nodeTitle = title || node.title;

        const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
        const isLandingPadActive = !didDrop && isDragging;

        return (
            <div ref={this.currentRef} className={`${path.length > 1 ? 'sidebar__item-nested' : ''} ${isSearchMatch ? 'sidebar__item-active' : ''} sidebar__item sidebar__link`} style={{ width: `calc(100% - ${10 * (path.length - 1)}px)`, marginLeft: `${10 * (path.length - 1)}px` }}>
                <div className="rst__rowToolbar">
                    {buttons.map((btn, index) => (
                        <div
                            key={index}
                            className="rst__toolbarButton"
                        >
                            {btn}
                        </div>
                    ))}
                </div>

                {connectDragPreview(<div className={`sidebar__item-content ${isLandingPadActive ? 'sidebar__item-valid' : ''} ${isDraggedDescendant ? 'sidebar__item-dragging' : ''}`}>
                    {connectDragSource(<p style={{ margin: 0 }}><span style={{ zIndex: 3, position: 'relative' }}>{nodeTitle ?? 'Add chapter'}</span></p>, { dropEffect: 'copy' })}
                    {node.children.length > 0 ?
                        <button className="sidebar__expandItemButton" onClick={() => toggleChildrenVisibility({ node, path, treeIndex })}>{!node.expanded ? <ArrowRight /> : <ArrowDown />}</button> :
                        null
                    }
                </div>)}
            </div>
        )
        // return (
        //   <div style={{ height: '100%' }} {...otherProps}>
        //     {toggleChildrenVisibility &&
        //       node.children &&
        //       (node.children.length > 0 || typeof node.children === 'function') && (
        //         <div>
        //           <button
        //             type="button"
        //             aria-label={node.expanded ? 'Collapse' : 'Expand'}
        //             className={classnames(
        //               node.expanded ? 'rst__collapseButton' : 'rst__expandButton',
        //               rowDirectionClass
        //             )}
        //             style={buttonStyle}
        //             onClick={() =>
        //               toggleChildrenVisibility({
        //                 node,
        //                 path,
        //                 treeIndex,
        //               })
        //             }
        //           />

        //           {node.expanded && !isDragging && (
        //             <div
        //               style={{ width: scaffoldBlockPxWidth }}
        //               className={classnames('rst__lineChildren', rowDirectionClass)}
        //             />
        //           )}
        //         </div>
        //       )}

        //     <div className={classnames('rst__rowWrapper', rowDirectionClass)}>
        //       {/* Set the row preview to be used during drag and drop */}
        //       {connectDragPreview(
        //         <div
        //           className={classnames(
        //             'rst__row',
        //             isLandingPadActive && 'rst__rowLandingPad',
        //             isLandingPadActive && !canDrop && 'rst__rowCancelPad',
        //             isSearchMatch && 'rst__rowSearchMatch',
        //             isSearchFocus && 'rst__rowSearchFocus',
        //             rowDirectionClass,
        //             className
        //           )}
        //           style={{
        //             opacity: isDraggedDescendant ? 0.5 : 1,
        //             ...style,
        //           }}
        //         >
        //           {handle}

        //           <div
        //             className={classnames(
        //               'rst__rowContents',
        //               !canDrag && 'rst__rowContentsDragDisabled',
        //               rowDirectionClass
        //             )}
        //           >
        //             <div className={classnames('rst__rowLabel', rowDirectionClass)}>
        //               <span
        //                 className={classnames(
        //                   'rst__rowTitle',
        //                   node.subtitle && 'rst__rowTitleWithSubtitle'
        //                 )}
        //               >
        //                 {typeof nodeTitle === 'function'
        //                   ? nodeTitle({
        //                       node,
        //                       path,
        //                       treeIndex,
        //                     })
        //                   : nodeTitle}
        //               </span>

        //               {nodeSubtitle && (
        //                 <span className="rst__rowSubtitle">
        //                   {typeof nodeSubtitle === 'function'
        //                     ? nodeSubtitle({
        //                         node,
        //                         path,
        //                         treeIndex,
        //                       })
        //                     : nodeSubtitle}
        //                 </span>
        //               )}
        //             </div>

        //             <div className="rst__rowToolbar">
        //               {buttons.map((btn, index) => (
        //                 <div
        //                   key={index} // eslint-disable-line react/no-array-index-key
        //                   className="rst__toolbarButton"
        //                 >
        //                   {btn}
        //                 </div>
        //               ))}
        //             </div>
        //           </div>
        //         </div>
        //       )}
        //     </div>
        //   </div>
        // );
    }
}

NodeRendererDefault.defaultProps = {
    isSearchMatch: false,
    isSearchFocus: false,
    canDrag: false,
    toggleChildrenVisibility: null,
    buttons: [],
    className: '',
    style: {},
    parentNode: null,
    draggedNode: null,
    canDrop: false,
    title: null,
    subtitle: null,
    rowDirection: 'ltr',
};

NodeRendererDefault.propTypes = {
    node: PropTypes.shape({}).isRequired,
    title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    subtitle: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    path: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
    treeIndex: PropTypes.number.isRequired,
    treeId: PropTypes.string.isRequired,
    isSearchMatch: PropTypes.bool,
    isSearchFocus: PropTypes.bool,
    canDrag: PropTypes.bool,
    scaffoldBlockPxWidth: PropTypes.number.isRequired,
    toggleChildrenVisibility: PropTypes.func,
    buttons: PropTypes.arrayOf(PropTypes.node),
    className: PropTypes.string,
    style: PropTypes.shape({}),

    // Drag and drop API functions
    // Drag source
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    parentNode: PropTypes.shape({}), // Needed for dndManager
    isDragging: PropTypes.bool.isRequired,
    didDrop: PropTypes.bool.isRequired,
    draggedNode: PropTypes.shape({}),
    // Drop target
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool,

    // rtl support
    rowDirection: PropTypes.string,
};

export default NodeRendererDefault;