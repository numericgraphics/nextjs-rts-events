import { renderHook } from '@testing-library/react-hooks'
import { useImagesServices } from '../hooks/useImagesServices'
import * as tools from '../data/tools'
import data from '../mock/test-call-event'

test('should precache image with useImagesServices', () => {
    const mockLoadImage = jest.spyOn(tools, 'preLoadImage')
    const mockGetAllImages = jest.spyOn(tools, 'getAllImagesFromJSON')
    // eslint-disable-next-line standard/no-callback-literal
    tools.preLoadImage.mockImplementation((image, callback) => { callback(true) })
    const { result } = renderHook(() => useImagesServices(data))
    expect(mockGetAllImages).toHaveBeenCalledTimes(1)
    expect(mockLoadImage).toHaveBeenCalledTimes(5)
    expect(result.current.ready).toBeTruthy()
})
