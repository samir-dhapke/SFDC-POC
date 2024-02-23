/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 01-05-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   01-05-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, wire } from 'lwc';
import { gql, graphql, refreshGraphQL } from 'lightning/uiGraphQLApi';


export default class GraphQlRefresh extends LightningElement {
    results;
    errors;
    graphqlData;

    @wire(graphql, {
        query: gql`
      query AccountWithName {
        uiapi {
          query {
            Account(first: 5) {
              edges {
                node {
                  Id
                  Name {
                    value
                  }
                }
              }
            }
          }
        }
    }`,
    })
    graphqlQueryResult(result) {
        const { data, errors } = result;

        if (data) {
            this.results = data.uiapi.query.Account.edges.map((edge) => edge.node);
        }
        this.errors = errors;
        this.graphqlData = result;
    }

    async handleRefresh() {
        return refreshGraphQL(this.graphqlData);
    }
}