import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import PostList from './PostList';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, title: 'Post 1', body: 'Body 1' },
        { id: 2, title: 'Post 2', body: 'Body 2' },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders the PostList component', async () => {
  render(<PostList />);

  // Wait for the posts to be fetched
  await waitFor(() => screen.getByText('PostList'));

  // Check if the posts are rendered
  expect(screen.getByText('Post 1')).toBeInTheDocument();
  expect(screen.getByText('Post 2')).toBeInTheDocument();
});

test('clicking "View Details" navigates to the post details page', async () => {
  render(<PostList />);

  // Wait for the posts to be fetched
  await waitFor(() => screen.getByText('PostList'));

  // Click the "View Details" link for the first post
  userEvent.click(screen.getByText('View Details'));

  // Check if the navigation is working correctly
  expect(screen.getByText('Loading...')).toBeInTheDocument(); // Assuming a loading indicator is shown
  await waitFor(() => expect(screen.getByText('Post Details')).toBeInTheDocument()); // Update this with the actual content on the post details page
});
