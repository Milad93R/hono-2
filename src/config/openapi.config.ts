export const openAPISpec = {
  openapi: '3.0.0',
  info: {
    title: 'Hono Vercel API',
    version: '1.0.0',
    description: 'A production-ready API built with Hono on Vercel with monitoring, error handling, and Swagger documentation.',
  },
  servers: [
    {
      url: 'https://hono-2-lovat.vercel.app',
      description: 'Production server (Primary)',
    },
    {
      url: 'https://hono-2-9henz8z2w-mrashidikhah-3181s-projects.vercel.app',
      description: 'Production server (Deployment)',
    },
    {
      url: 'http://localhost:3072',
      description: 'Development server',
    },
  ],
  tags: [
    { name: 'General', description: 'General informational endpoints' },
    { name: 'Testing', description: 'Endpoints used for testing and debugging' },
    { name: 'Telegram', description: 'Telegram messaging integration endpoints' },
    { name: 'MongoDB', description: 'MongoDB database operations endpoints' },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'API key for authentication. Required for most endpoints.',
      },
    },
    schemas: {
      TelegramMessageRequest: {
        type: 'object',
        required: ['message'],
        properties: {
          message: {
            type: 'string',
            description: 'Message text to send to Telegram threads. HTML formatting supported.'
          },
          threads: {
            type: 'array',
            description: 'Additional thread IDs to send to. Default thread is always included automatically.',
            items: {
              type: 'integer'
            }
          }
        }
      },
      TelegramLogRequest: {
        type: 'object',
        required: ['message'],
        properties: {
          level: {
            type: 'string',
            description: 'Log level label (INFO, WARN, ERROR, etc.). Defaults to INFO.'
          },
          message: {
            type: 'string'
          },
          threads: {
            type: 'array',
            items: {
              type: 'integer'
            }
          }
        }
      },
      TelegramSendResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          },
          results: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                thread: {
                  type: 'integer'
                },
                success: {
                  type: 'boolean'
                },
                error: {
                  type: 'string'
                }
              }
            }
          },
          timestamp: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      TelegramThreadsResponse: {
        type: 'object',
        properties: {
          threads: {
            type: 'object',
            additionalProperties: {
              type: 'integer'
            }
          },
          description: {
            type: 'object',
            additionalProperties: {
              type: 'string'
            }
          }
        }
      },
      MongoDocument: {
        type: 'object',
        description: 'A MongoDB document with flexible fields',
        additionalProperties: true
      },
      MongoQueryRequest: {
        type: 'object',
        properties: {
          query: {
            type: 'object',
            description: 'MongoDB query filter',
            additionalProperties: true
          },
          limit: {
            type: 'integer',
            description: 'Maximum number of documents to return',
            default: 100
          }
        }
      }
    }
  },
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  paths: {
    '/': {
      get: {
        tags: ['General'],
        summary: 'Root endpoint',
        description: 'Returns a welcome message and API information',
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                    docs: { type: 'string' }
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/test/error': {
      get: {
        tags: ['Testing'],
        summary: 'Test error endpoint',
        description: 'Triggers a test error for monitoring and logging purposes. Provide the optional X-Debug-Secret header to receive detailed error information.',
        responses: {
          '500': {
            description: 'Test error response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                    path: { type: 'string' }
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/telegram/send': {
      post: {
        tags: ['Telegram'],
        summary: 'Send Telegram message',
        description: 'Sends a message to the configured Telegram group threads. Default thread is always included and additional threads can be specified.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TelegramMessageRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Message dispatch results',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TelegramSendResponse'
                }
              }
            }
          }
        }
      }
    },
    '/api/telegram/log': {
      post: {
        tags: ['Telegram'],
        summary: 'Send formatted Telegram log',
        description: 'Formats a log message with level and sends it to Telegram threads. Default thread is always included.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TelegramLogRequest'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Log dispatch results',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TelegramSendResponse'
                }
              }
            }
          }
        }
      }
    },
    '/api/telegram/threads': {
      get: {
        tags: ['Telegram'],
        summary: 'List Telegram thread IDs',
        description: 'Returns the configured Telegram thread IDs and descriptions.',
        responses: {
          '200': {
            description: 'Thread information',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TelegramThreadsResponse'
                }
              }
            }
          }
        }
      }
    },
    '/api/mongodb/collections': {
      get: {
        tags: ['MongoDB'],
        summary: 'List all collections',
        description: 'Returns a list of all collections in the MongoDB database.',
        responses: {
          '200': {
            description: 'List of collection names',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    collections: {
                      type: 'array',
                      items: { type: 'string' }
                    },
                    count: { type: 'integer' },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/mongodb/{collection}': {
      get: {
        tags: ['MongoDB'],
        summary: 'Get all documents from a collection',
        description: 'Retrieves all documents from the specified collection with optional limit.',
        parameters: [
          {
            name: 'collection',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Name of the MongoDB collection'
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', default: 100 },
            description: 'Maximum number of documents to return'
          }
        ],
        responses: {
          '200': {
            description: 'Documents retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    collection: { type: 'string' },
                    documents: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/MongoDocument' }
                    },
                    returned: { type: 'integer' },
                    total: { type: 'integer' },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['MongoDB'],
        summary: 'Create a new document',
        description: 'Inserts a new document into the specified collection.',
        parameters: [
          {
            name: 'collection',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Name of the MongoDB collection'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/MongoDocument' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Document created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    collection: { type: 'string' },
                    insertedId: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/mongodb/{collection}/{id}': {
      get: {
        tags: ['MongoDB'],
        summary: 'Get a document by ID',
        description: 'Retrieves a single document by its MongoDB ObjectId.',
        parameters: [
          {
            name: 'collection',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Name of the MongoDB collection'
          },
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'MongoDB ObjectId of the document'
          }
        ],
        responses: {
          '200': {
            description: 'Document retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    collection: { type: 'string' },
                    document: { $ref: '#/components/schemas/MongoDocument' },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Document not found'
          }
        }
      },
      put: {
        tags: ['MongoDB'],
        summary: 'Update a document by ID',
        description: 'Updates a document by its MongoDB ObjectId.',
        parameters: [
          {
            name: 'collection',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Name of the MongoDB collection'
          },
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'MongoDB ObjectId of the document'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/MongoDocument' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Document updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    collection: { type: 'string' },
                    id: { type: 'string' },
                    modifiedCount: { type: 'integer' },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Document not found'
          }
        }
      },
      delete: {
        tags: ['MongoDB'],
        summary: 'Delete a document by ID',
        description: 'Deletes a document by its MongoDB ObjectId.',
        parameters: [
          {
            name: 'collection',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Name of the MongoDB collection'
          },
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'MongoDB ObjectId of the document'
          }
        ],
        responses: {
          '200': {
            description: 'Document deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    collection: { type: 'string' },
                    id: { type: 'string' },
                    deletedCount: { type: 'integer' },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Document not found'
          }
        }
      }
    },
    '/api/mongodb/{collection}/query': {
      post: {
        tags: ['MongoDB'],
        summary: 'Query documents with custom filter',
        description: 'Queries documents in a collection using a custom MongoDB filter.',
        parameters: [
          {
            name: 'collection',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Name of the MongoDB collection'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/MongoQueryRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Documents retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    collection: { type: 'string' },
                    query: { type: 'object' },
                    documents: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/MongoDocument' }
                    },
                    count: { type: 'integer' },
                    timestamp: { type: 'string', format: 'date-time' }
                  }
                }
              }
            }
          }
        }
      }
    },
  },
}

