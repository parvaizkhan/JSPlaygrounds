import _ from 'lodash';
import React, { useContext } from 'react';
import parseExpressions from '../selectors/parse_expressions';
import SplitPane from 'react-split-pane';
import { StoreContext } from '../App'

const getExpressions = state => {
    let expressions, errors;

    try {
        expressions = parseExpressions(state);
    } catch (e) {
        errors = e.toString();
    }

    return { expressions, errors };
}

const evaluateExpressions = expressions => {
    const formattedExpressions = _.mapValues(expressions, expression => {
        // eslint-disable-next-line
        const result = eval(expression);
        if (result && result.type) {
            return result;
        } else if (_.isFunction(result) && result.name) {
            return <i>Function {result.name}</i>;
        } else if (_.isBoolean(result)) {
            return result ? 'True' : 'False';
        } else if (_.isObject(result) || _.isArray(result)) {
            return JSON.stringify(result);
        }

        return result;
    });

    return _.map(formattedExpressions, (expression, line) =>
        <div key={line}>{expression}</div>
    );
}

export default () => {

    const store = useContext(StoreContext)

    const { expressions, errors } = getExpressions(store.getState())

    const defaultHeight = window.innerHeight / 1.3;

    return (
        <SplitPane split="horizontal" defaultSize={defaultHeight} className="viewer">
            <div className="result">
                {evaluateExpressions(expressions)}
            </div>
            <div className="errors">
                {errors}
            </div>
        </SplitPane>
    )
}
