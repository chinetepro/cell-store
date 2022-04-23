import React from 'react';
import PropTypes from 'prop-types';
import BusinessNotFound from '../../assets/img/Business_404.svg';
import EmptySearchResult from '../Alert/EmptySearchResult';

const EntityViewRender = ({ Table, view, List, ...props }) => {
    const _view = (view || 'list');

    switch (_view) {
        case 'table': {
            return (
                <Table {...props} />
            );
        }
        default: {
            return <List {...props} />;
        }
    }
};

const EntityView = ({ isSearching, isEmpty, ...props }) => {
    if (!props.isLoading && isEmpty) {
        return (
            <div className="min-h-60-screen flex justify-center w-full">
                {
                    isSearching
                        ? <EmptySearchResult t={props.t} image={BusinessNotFound}/>
                        : <EmptySearchResult t={props.t} image={BusinessNotFound} message="" />
                }
            </div>
        );
    }
    else
        return (<EntityViewRender {...props} />);
};

export default EntityView;

EntityView.defaultProps = {
    data: []
};
EntityView.propTypes = {
    isSearching: PropTypes.bool,
    isEmpty: PropTypes.bool,
    title: PropTypes.string,
    view: PropTypes.string,
    isLoading: PropTypes.bool,
    data: PropTypes.array,
    Table: PropTypes.any,
    List: PropTypes.any,
    t: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    CardRender: PropTypes.any,
    columns: PropTypes.array
};
