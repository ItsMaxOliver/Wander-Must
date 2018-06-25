import React, { Component } from 'react';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Category from "../components/Category";
import Item from "../components/Item";
import suitcaseHandleWhite from "../images/suitcase-handle-white.png";
import "../styles/Suitcase.css";
import Wunderground from "../utils/Wunderground";
import gql from "graphql-tag";
import ApolloClient from 'apollo-boost';

const client = new ApolloClient();

export default class Suitcase extends Component {
  state = {
    suitcase: {
      Items: [],
      Locale: [],
      User: []
    },
    number: 10
  };

  componentDidMount() {

    client.query({
      query: gql` 
      {
        getSuitcase(id: "10") {
          start_date
          end_date
          travel_category
          Items {
            id
            item_name
            item_category
          }
          Locale {
            id
            locale_city
            locale_admin
            locale_country
          }
          User {
            id
            username
            gender
          }
        }
      }`
    }).then(result => {
      this.setState({ suitcase: result.data.getSuitcase });
      console.log(this.state.suitcase);
    })

  }

  render() {
    return (
      <div className="suitcase profile-page sidebar-collapse">
        <Header />
        <Main>
          <div className="page-header header-filter" data-parallax="true" id="background-suitcase"></div>
          <div className="main main-raised">
            <div className="profile-content">

              <div className="container">
                <div className="row">
                  <div className="col-md-6 ml-auto mr-auto">
                    <div className="profile profile-handle">
                      <div className="handle">
                        <img src={suitcaseHandleWhite} alt="WM Handle" className="handle-image" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card card-nav-tabs card-plain">
                  <div className="suitcase-header card-header card-header-default">

                    <div id="suitcase-nav" className="nav-tabs-navigation" data-suitcase_id="{{suitcase.id}}">
                      <div className="nav-tabs-wrapper">
                        <ul className="nav suitcase-nav">
                          <li className="nav-item ">
                            <p className="nav-link" id="suitcase-user">{this.state.suitcase.User.username}</p>
                          </li>
                          <li className="nav-item ">
                            <p className="nav-link" id="suitcase-user-gender">{this.state.suitcase.User.gender}</p>
                          </li>
                          <li className="nav-item ">
                            <a className="nav-link" id="suitcase-locale" href={"/search/" + this.state.suitcase.Locale.locale_city}>{this.state.suitcase.Locale.locale_city}</a>
                          </li>
                          <li className="nav-item">
                            <p className="nav-link d-inline-block" id="suitcase-startDate">{this.state.suitcase.start_date ?this.state.suitcase.start_date : null}</p>-
                  <p className="nav-link d-inline-block" id="suitcase-endDate">{this.state.suitcase.end_date ?this.state.suitcase.end_date : null}</p>
                          </li>

                          <li className="nav-item">
                            <p className="nav-link" id="suitcase-travelCategory">{this.state.suitcase.travel_category ?this.state.suitcase.travel_category : null}</p>
                          </li>

                        </ul>
                        {/* <Wunderground
                          startDate={this.state.suitcase.start_date}
                          endDate={this.state.suitcase.end_date}
                          city={this.state.suitcase.locale_city}
                          admin={this.state.suitcase.locale_admin}
                          country={this.state.suitcase.locale_country}
                        /> */}
                      </div>
                    </div>
                  </div>

                </div>
              </div>


              <div className="row">
                <div className="col-12">
                  <div id="items">

                    <Category>
                      <div className="title row">
                        <div>
                          <span className="badge badge-pill badge-info">Toiletries</span>
                        </div>
                        <div>
                          <button data-category="toiletries" className="all btn btn-primary btn-sm ml-3">Select all</button>
                        </div>
                      </div>
                      <div className="row cat-row" id="toiletries">
                        {this.state.suitcase.Items
                          .filter(item => (item.item_category === "TOILETRIES"))
                          .map(item => (
                            <Item
                              key={item.item_name}
                              itemName={item.item_name}
                              itemCategory={item.item_category}
                            />
                          ))
                        }
                      </div>
                    </Category>

                    <Category>
                      <div className="title row">
                        <div>
                          <span className="badge badge-pill badge-info">Clothing</span>
                        </div>
                        <div>
                          <button data-category="clothing" className="all btn btn-primary btn-sm ml-3">Select all</button>
                        </div>
                      </div>
                      <div className="row cat-row" id="clothing">
                      {this.state.suitcase.Items
                          .filter(item => (item.item_category === "CLOTHING"))
                          .map(item => (
                            <Item
                              key={item.item_name}
                              itemName={item.item_name}
                              itemCategory={item.item_category}
                            />
                          ))
                         
                        }
                      </div>
                    </Category>


                    <Category>
                      <div className="title row">
                        <div>
                          <span className="badge badge-pill badge-info">Accessories</span>
                        </div>
                        <div>
                          <button data-category="accessories" className="all btn btn-primary btn-sm ml-3">Select all</button>
                        </div>
                      </div>
                      <div className="row cat-row" id="accessories">
                      {this.state.suitcase.Items
                          .filter(item => (item.item_category === "ACCESSORIES"))
                          .map(item => (
                            <Item
                              key={item.item_name}
                              itemName={item.item_name}
                              itemCategory={item.item_category}
                            />
                          ))
                          
                        }
                      </div>
                    </Category>


                    <Category>
                      <div className="title row">
                        <div>
                          <span className="badge badge-pill badge-info">Electronics</span>
                        </div>
                        <div>
                          <button data-category="electronics" className="all btn btn-primary btn-sm ml-3">Select all</button>
                        </div>
                      </div>
                      <div className="row cat-row" id="electronics">
                      {this.state.suitcase.Items
                          .filter(item => (item.item_category === "ELECTRONICS"))
                          .map(item => (
                            <Item
                              key={item.item_name}
                              itemName={item.item_name}
                              itemCategory={item.item_category}
                            />
                          ))
                          
                        }
                      </div>
                    </Category>

                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-6 mx-auto my-3 text-center">
                  <button id="add-items" className="btn btn-primary btn-lg">Add Selected Items To My Suitcase</button>
                </div>
                <div className="col-12 text-center" id="add-more-items-holder">
                  <a className="btn btn-lg btn-primary mt-3 mb-3 px-3 pb-2 pt-3" id="add-more-items" href="/suitcase-start">

                    <p>See Full List of Items To Choose From</p>

                  </a>
                </div>
              </div>
            </div>
          </div>
        </Main>
        <Footer />
      </div>
    )
  }
}
