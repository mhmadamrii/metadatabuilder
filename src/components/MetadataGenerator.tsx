'use client'

import { useState } from 'react'
import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { Trash } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

export function MetadataGenerator() {
  const initialValueDisplayedFields = {
    base: true,
    openGraph: true,
    robots: true,
    twitter: true,
    verification: true,
  }

  const [displayedFields, setDisplayedFields] = useState(
    initialValueDisplayedFields,
  )

  const [metadata, setMetadata] = useState({
    metadataBase: '',
    alternates: {
      canonical: '/',
    },
    title: {
      default: '',
      template: '%s | My App',
    },
    description: '',
    openGraph: {
      title: '',
      description: '',
      url: '',
      siteName: '',
      locale: 'en_US',
      type: 'website',
      images: [{ url: '' }], // Initialize with an empty object
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: '',
      description: '',
      siteId: '',
      creator: '',
      creatorId: '',
      images: [''],
    },
    verification: {
      google: '',
      yandex: '',
    },
  })

  const [generatedCode, setGeneratedCode] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setMetadata(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleNestedInputChange = (path: string, value: any) => {
    setMetadata(prevState => {
      const newState = { ...prevState }
      const keys = path.split('.')
      let current = newState
      for (let i = 0; i < keys.length - 1; i++) {
        // @ts-expect-error: could be defined or undefined
        if (!current[keys[i]]) {
          // @ts-expect-error: could be defined or undefined
          current[keys[i]] = {}
        }
        // @ts-expect-error: could be defined or undefined
        current = current[keys[i]]
      }
      // @ts-expect-error: could be defined or undefined
      current[keys[keys.length - 1]] = value
      return newState
    })
  }

  const generateMetadataCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const code = `export const metadata = ${JSON.stringify(metadata, null, 2)}`
    setGeneratedCode(code)
  }

  const areAllFieldsFalse = Object.values(displayedFields).every(
    value => value === false,
  )

  console.log(areAllFieldsFalse)

  return (
    <Card className='mx-auto w-full max-w-7xl'>
      <CardHeader>
        <CardTitle>Next.js Metadata Generator</CardTitle>
        <CardDescription>
          Fill in the fields to generate Next.js metadata code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-6 md:flex-row'>
          <form onSubmit={e => e.preventDefault()} className='flex-1 space-y-4'>
            <div
              className={cn('block', {
                hidden: !displayedFields.base,
              })}
            >
              <div className='flex justify-between'>
                <h1 className='font-bold'>Base</h1>
                <Button
                  onClick={() =>
                    setDisplayedFields({
                      ...displayedFields,
                      base: false,
                    })
                  }
                  variant='destructive'
                  size='icon'
                >
                  <Trash />
                </Button>
              </div>
              <div>
                <Label htmlFor='metadataBase'>Metadata Base</Label>
                <Input
                  id='metadataBase'
                  name='metadataBase'
                  value={metadata.metadataBase}
                  onChange={handleInputChange}
                  placeholder='https://example.com'
                />
              </div>
              <div>
                <Label htmlFor='title.default'>Default Title</Label>
                <Input
                  id='title.default'
                  name='title.default'
                  value={metadata.title.default}
                  onChange={e =>
                    handleNestedInputChange('title.default', e.target.value)
                  }
                  placeholder='My App'
                />
              </div>
              <div>
                <Label htmlFor='title.template'>Title Template</Label>
                <Input
                  id='title.template'
                  name='title.template'
                  value={metadata.title.template}
                  onChange={e =>
                    handleNestedInputChange('title.template', e.target.value)
                  }
                  placeholder='%s | My App'
                />
              </div>
              <div>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  name='description'
                  value={metadata.description}
                  onChange={handleInputChange}
                  placeholder='Page Description'
                />
              </div>
              <div>
                <Label htmlFor='alternates.canonical'>Canonical URL</Label>
                <Input
                  id='alternates.canonical'
                  name='alternates.canonical'
                  value={metadata.alternates.canonical}
                  onChange={e =>
                    handleNestedInputChange(
                      'alternates.canonical',
                      e.target.value,
                    )
                  }
                  placeholder='/'
                />
              </div>
            </div>
            <div
              className={cn('space-y-2', {
                hidden: !displayedFields.openGraph,
              })}
            >
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold'>Open Graph</h3>
                <Button
                  onClick={() =>
                    setDisplayedFields({
                      ...displayedFields,
                      openGraph: false,
                    })
                  }
                  variant='destructive'
                  size='icon'
                >
                  <Trash />
                </Button>
              </div>
              <Input
                name='openGraph.title'
                value={metadata.openGraph.title}
                onChange={e =>
                  handleNestedInputChange('openGraph.title', e.target.value)
                }
                placeholder='OG Title'
              />
              <Input
                name='openGraph.description'
                value={metadata.openGraph.description}
                onChange={e =>
                  handleNestedInputChange(
                    'openGraph.description',
                    e.target.value,
                  )
                }
                placeholder='OG Description'
              />
              <Input
                name='openGraph.url'
                value={metadata.openGraph.url}
                onChange={e =>
                  handleNestedInputChange('openGraph.url', e.target.value)
                }
                placeholder='OG URL'
              />
              <Input
                name='openGraph.siteName'
                value={metadata.openGraph.siteName}
                onChange={e =>
                  handleNestedInputChange('openGraph.siteName', e.target.value)
                }
                placeholder='OG Site Name'
              />
              <Input
                name='openGraph.images[0].url'
                value={metadata.openGraph.images[0]?.url || ''}
                onChange={e =>
                  handleNestedInputChange(
                    'openGraph.images.0.url',
                    e.target.value,
                  )
                }
                placeholder='OG Image URL'
              />
            </div>
            <div
              className={cn('space-y-2', { hidden: !displayedFields.robots })}
            >
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold'>Open Graph</h3>
                <Button
                  onClick={() =>
                    setDisplayedFields({
                      ...displayedFields,
                      robots: false,
                    })
                  }
                  variant='destructive'
                  size='icon'
                >
                  <Trash />
                </Button>
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='robots.index'
                  checked={metadata.robots.index}
                  onChange={e =>
                    handleNestedInputChange('robots.index', e.target.checked)
                  }
                />
                <Label htmlFor='robots.index'>Index</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='robots.follow'
                  checked={metadata.robots.follow}
                  onChange={e =>
                    handleNestedInputChange('robots.follow', e.target.checked)
                  }
                />
                <Label htmlFor='robots.follow'>Follow</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='robots.googleBot.index'
                  checked={metadata.robots.googleBot.index}
                  onChange={e =>
                    handleNestedInputChange(
                      'robots.googleBot.index',
                      e.target.checked,
                    )
                  }
                />
                <Label htmlFor='robots.googleBot.index'>GoogleBot Index</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='robots.googleBot.follow'
                  checked={metadata.robots.googleBot.follow}
                  onChange={e =>
                    handleNestedInputChange(
                      'robots.googleBot.follow',
                      e.target.checked,
                    )
                  }
                />
                <Label htmlFor='robots.googleBot.follow'>
                  GoogleBot Follow
                </Label>
              </div>
              <Input
                name='robots.googleBot.max-video-preview'
                value={metadata.robots.googleBot['max-video-preview']}
                onChange={e =>
                  handleNestedInputChange(
                    'robots.googleBot.max-video-preview',
                    parseInt(e.target.value, 10),
                  )
                }
                placeholder='GoogleBot Max Video Preview'
              />
              <Input
                name='robots.googleBot.max-image-preview'
                value={metadata.robots.googleBot['max-image-preview']}
                onChange={e =>
                  handleNestedInputChange(
                    'robots.googleBot.max-image-preview',
                    e.target.value,
                  )
                }
                placeholder='GoogleBot Max Image Preview'
              />
              <Input
                name='robots.googleBot.max-snippet'
                value={metadata.robots.googleBot['max-snippet']}
                onChange={e =>
                  handleNestedInputChange(
                    'robots.googleBot.max-snippet',
                    parseInt(e.target.value, 10),
                  )
                }
                placeholder='GoogleBot Max Snippet'
              />
            </div>

            <div
              className={cn('space-y-2', { hidden: !displayedFields.twitter })}
            >
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold'>Twitter</h3>
                <Button
                  onClick={() =>
                    setDisplayedFields({
                      ...displayedFields,
                      twitter: false,
                    })
                  }
                  variant='destructive'
                  size='icon'
                >
                  <Trash />
                </Button>
              </div>
              <Input
                name='twitter.title'
                value={metadata.twitter.title}
                onChange={e =>
                  handleNestedInputChange('twitter.title', e.target.value)
                }
                placeholder='Twitter Title'
              />
              <Input
                name='twitter.description'
                value={metadata.twitter.description}
                onChange={e =>
                  handleNestedInputChange('twitter.description', e.target.value)
                }
                placeholder='Twitter Description'
              />
              <Input
                name='twitter.creator'
                value={metadata.twitter.creator}
                onChange={e =>
                  handleNestedInputChange('twitter.creator', e.target.value)
                }
                placeholder='Twitter Creator'
              />
              <Input
                name='twitter.images[0]'
                value={metadata.twitter.images[0] || ''}
                onChange={e =>
                  handleNestedInputChange('twitter.images.0', e.target.value)
                }
                placeholder='Twitter Image URL'
              />
            </div>
            <div
              className={cn('space-y-2', {
                hidden: !displayedFields.verification,
              })}
            >
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold'>Verification</h3>
                <Button
                  onClick={() =>
                    setDisplayedFields({
                      ...displayedFields,
                      verification: false,
                    })
                  }
                  variant='destructive'
                  size='icon'
                >
                  <Trash />
                </Button>
              </div>
              <Input
                name='verification.google'
                value={metadata.verification.google}
                onChange={e =>
                  handleNestedInputChange('verification.google', e.target.value)
                }
                placeholder='Google Verification'
              />
              <Input
                name='verification.yandex'
                value={metadata.verification.yandex}
                onChange={e =>
                  handleNestedInputChange('verification.yandex', e.target.value)
                }
                placeholder='Yandex Verification'
              />
            </div>
            {areAllFieldsFalse ? (
              <Button
                onClick={() => setDisplayedFields(initialValueDisplayedFields)}
              >
                Reset
              </Button>
            ) : (
              <Button onClick={e => generateMetadataCode(e)}>
                Generate Metadata Code
              </Button>
            )}
          </form>

          <div className='flex-1'>
            <Label htmlFor='generatedCode'>Generated Metadata Code</Label>
            <Textarea
              id='generatedCode'
              value={generatedCode}
              readOnly
              className='h-full min-h-[300px] font-mono text-sm'
              placeholder='Generated metadata code will appear here'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
