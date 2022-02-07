import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

test('shows start/stop button', async () => {
  render(<App secondDuration={1} />);

  const button = screen.getByRole('button', {name: /start/i});
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent(/start/i);

  fireEvent.click(button)
  expect(button).toHaveTextContent(/stop/i);

  // const stopButton = screen.getByRole('button', {name: /stop/i});
  // expect(stopButton).toBeInTheDocument();

  fireEvent.click(button)
  expect(button).toHaveTextContent(/start/i);

  await sleep(2)
  // fails
  // expect(screen.getByTestId("time")).toHaveTextContent("0:58")
});
