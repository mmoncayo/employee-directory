import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import EmployeeRow from "../EmployeeRow/index";
import API from "../../utils/API";
import "./style.css";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            currentSort: "A-Z",
            query: "",
            queryResults: [],
        };
    }

    componentDidMount() {
        API.getEmployees().then((res) => {
            const sortedEmployees = this.sortByName(res.results, "A-Z");
            this.setState({ employees: sortedEmployees, queryResults: sortedEmployees });
        });
    }

    sortByName(employees, type) {
        let completed = false;

        while (!completed) {
            completed = true;

            for (let i = 0; i < employees.length - 1; i++) {
                let current = employees[i];
                let next = employees[i + 1];

                if (current.name.last[0] > next.name.last[0] && type === "A-Z") {
                    completed = false;
                    let temp = next;
                    employees[i + 1] = current;
                    employees[i] = temp;
                } else if (current.name.last[0] < next.name.last[0] && type === "Z-A") {
                    completed = false;
                    let temp = next;
                    employees[i + 1] = current;
                    employees[i] = temp;
                }
            }
        }

        return employees;
    }

    handleSort = () => {
        if (this.state.currentSort === "A-Z") {
            let AZSort = this.sortByName(this.state.queryResults, "Z-A");
            this.setState({ queryResults: AZSort, currentSort: "Z-A" });
        } else if (this.state.currentSort === "Z-A") {
            let ZASort = this.sortByName(this.state.queryResults, "A-Z");
            this.setState({ queryResults: ZASort, currentSort: "A-Z" });
        }
    };

    handleQuery = (event) => {
        const query = event.target.value;
        const currentEmployees = [...this.state.employees];
        const filterEmployees = currentEmployees.filter((user) => {
            if (
                user.name.first.includes(query) ||
                user.name.last.includes(query) ||
                user.email.includes(query) ||
                user.cell.includes(query)
            ) {
                return user;
            }
        });

        this.setState({ query, queryResults: filterEmployees });
    };

    render() {
        const { queryResults } = this.state;
        return (
            <main>
                <Container fluid className="text-center">
                    <input
                        type="text"
                        placeholder="Search... "
                        onChange={this.handleQuery}
                    />
                </Container>

                <Container fluid="lg" className="mt-3 border">
                    <Row className="border-bottom">
                        <Col sm md="2">
                            <strong>Picture</strong>
                        </Col>
                        <Col sm md="3">
                            <strong onClick={this.handleSort} id="sort-title">
                                Name <em>({this.state.currentSort})</em>
                            </strong>
                        </Col>
                        <Col sm md="4">
                            <strong>E-mail</strong>
                        </Col>
                        <Col sm md="3">
                            <strong>Phone</strong>
                        </Col>
                    </Row>
                    {queryResults.map((employee) => (
                        <EmployeeRow
                            key={employee.cell}
                            picture={employee.picture.thumbnail}
                            firstName={employee.name.first}
                            lastName={employee.name.last}
                            email={employee.email}
                            cell={employee.cell}
                        />
                    ))}
                </Container>
            </main>
        );
    }
}

export default Main;
