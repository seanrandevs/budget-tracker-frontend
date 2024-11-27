import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { createTransaction } from './apiService';


const AddTransactions = ({ onTransactionAdded }) => {
    const [formData, setFormData] = useState({
        type: '',
        category: '',
        amount: '',
        date: '',
        description: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Call the API to create a new transaction
          const newTransaction = await createTransaction(formData);
    
          console.log('Transaction added:', newTransaction);

          onTransactionAdded();
    
          // Reset the form
          setFormData({
            type: '',
            category: '',
            amount: '',
            date: '',
            description: '',
          });
        } catch (error) {
          console.error('Error adding transaction:', error);
        }
      };

return (
    <Container className="add-transactions">
      <Row className="justify-content-center">
        <Col md={3}>
          <h4>Add New Transaction</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Enter type (e.g., Income, Expense)"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category (e.g., Food, Salary)"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
);
};

export default AddTransactions