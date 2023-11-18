/* eslint-disable react/jsx-filename-extension */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import CreateBlog from './CreateBlog';

describe('testing single blog', () => {
  let container;
  let mockHandler;
  beforeEach(() => {
    const blogData = {
      title: 'testtitle',
      url: 'testurl',
      author: 'testauthor',
      likes: 1,
      user: '1111',
    };
    mockHandler = jest.fn().mockResolvedValue({ likes: 1 });
    container = render(<Blog blog={blogData} handleUpdate={mockHandler} />).container;
  });
  test('shows title and author when first rendered but no url', () => {
    const blog = container.querySelector('.blog');
    expect(blog).toHaveTextContent('testtitle');
    expect(blog).toHaveTextContent('testauthor');
    expect(blog).not.toHaveTextContent('testurl');
  });

  test('show likes and url when show button clicked', async () => {
    const blog = container.querySelector('.blog');
    const user = userEvent.setup();
    const button = screen.getByText('Show');
    await user.click(button);
    expect(blog).toHaveTextContent('testurl');
    expect(blog).toHaveTextContent('Likes: 1');
  });

  test('clicking likes button twice gets actually triggered twice', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('Show');
    await user.click(button);
    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

test('it creates a new blog by using correct inputs', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<CreateBlog onSubmit={createBlog} />);

  const submit = screen.getByRole('button');
  const titleField = container.querySelector('#title');
  const urlField = container.querySelector('#url');
  await user.type(titleField, 'supertitle');
  await user.type(urlField, 'superurl');
  await user.click(submit);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('supertitle');
  expect(createBlog.mock.calls[0][0].url).toBe('superurl');
});
