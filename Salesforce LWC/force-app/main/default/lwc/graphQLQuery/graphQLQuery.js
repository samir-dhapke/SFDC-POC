/**
 * @description       : 
 * @author            : Samir Dhapke
 * @group             : 
 * @last modified on  : 01-17-2024
 * @last modified by  : Samir Dhapke
 * Modifications Log
 * Ver   Date         Author         Modification
 * 1.0   01-08-2024   Samir Dhapke   Initial Version
**/
import { LightningElement, wire } from 'lwc';
import { gql, graphql } from 'lightning/uiGraphQLApi';

const column = [
  { label: "Name", fieldName: "Name", type: "text" },
  { label: "Phone", fieldName: "Phone", type: "phone" },
  { label: "Email", fieldName: "Email", type: "email" },
  { label: "Account Name", fieldName: "AccountName", type: "text" },
  { label: "Annual Revenue", fieldName: "AnnualRevenue", type: "currency" },
  { label: "Created Date", fieldName: "CreatedDate", type: "date" },

];
export default class GraphQLQuery extends LightningElement {
  results;
  errors;
  searchValue = '';
  dataList = [];
  columnList = column;
  after = null;
  pageInfo;
  pageNumber = 1;
  totalCount = 0;
  pageSize = 5;
  isLoading = false;

  connectedCallback() {
    this.isLoading = true;
  }
  get variables() {
    return {
      likeParams: "%" + this.searchValue + "%",
      limit: this.pageSize,
      after: this.after
    }
  }

  handleOnChange(event) {
    event.preventDefault();
    this.searchValue = event.target.value;
  }
  @wire(graphql, {
    query: gql`
        query getContacts(
                $likeParams:String,
                $limit:Int,
                $after:String
        ) {
          uiapi {
            query {
              Contact(
                first:$limit,
                orderBy:{Name:{order:ASC}},
                where:{
                    Name:{like: $likeParams}
                },
                after:$after
              ) {
                edges {
                  node {
                    Id
                    Name {
                      value
                    }
                    Email{
                        value
                    }
                    Phone{
                        value
                    }
                    CreatedDate{
                        value
                        displayValue
                    }
                    Account{
                      Id
                      Name{
                        value
                      }
                      Rating{
                        value
                        displayValue
                      }
                      AnnualRevenue{
                        value
                        displayValue
                      }
                    }
                  }
                }
                totalCount
                pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
                }
              }
            }
          }
      }`,
    variables: '$variables'
  })
  graphqlQueryResult({ data, errors }) {
    if (data) {
      // console.log("Data ====>" + JSON.stringify(data));
      this.pageInfo = data.uiapi.query?.Contact?.pageInfo;
      this.totalCount = data.uiapi.query?.Contact?.totalCount;
      this.dataList = data.uiapi.query?.Contact?.edges?.map((item) => {
        return {
          Id: item.node.Id,
          Name: item.node.Name.value,
          Phone: item.node.Phone.value,
          Email: item.node.Email.value,
          AccountName: item.node.Account?.Name.value,
          AnnualRevenue: item.node.Account?.AnnualRevenue?.value,
          CreatedDate: item.node.CreatedDate.value,
        }
      });
      this.isLoading = false;
      // console.log("this.dataList " + JSON.stringify(this.dataList));
    }
    this.errors = errors;
  }
  get totalPages() {
    return Math.ceil(this.totalCount / this.pageSize);
  }
  handlereset(event) {
    event.preventDefault();
    this.isLoading = true;
    this.after = null;
    this.pageNumber = 1;

  }
  get disableNextButton() {
    return !this.pageInfo?.hasNextPage;
  }
  handleNext(event) {
    event.preventDefault();
    this.isLoading = true;
    if (this.pageInfo && this.pageInfo.hasNextPage) {
      this.after = this.pageInfo.endCursor;
      this.pageNumber++;
    }
    else {
      this.after = null;
      this.pageNumber = 1;
    }
  }
}