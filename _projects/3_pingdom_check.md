---
layout: page
title: Pingdom Hostname Check Automation
description: Concurrent Pingdom API integration for bulk hostname availability checks with CSV export
img: assets/img/projects/pingdom-hostname-check.jpg
importance: 3
category: work
github: https://github.com/mainulhossain123/pingdom-hostname-check
---

## Overview

A plug-and-play Python script that leverages Pingdom's API v3.1 to perform concurrent availability checks across multiple target URLs. Built for operations teams managing large-scale web infrastructure, this tool automates the verification of hostname accessibility and exports detailed results to CSV for reporting and analysis.

## Key Features

### Concurrent API Processing

- **Async HTTP Requests**: Uses `aiohttp` and `asyncio` for non-blocking concurrent API calls
- **Bulk Operations**: Checks multiple hostnames simultaneously, dramatically reducing execution time
- **CSV Export**: Automatically generates structured CSV output with check status, probe descriptions, and Pingdom check IDs

### Pingdom API Integration

- **Bearer Token Authentication**: Secure API access using Pingdom API tokens
- **Single Check Endpoint**: Leverages `/api/3.1/single` endpoint for targeted hostname validation
- **Multi-Site Support**: Comma-separated hostname input for batch processing

### Production Features

- **Error Handling**: Graceful failure handling with detailed error messages in output
- **Response Parsing**: Extracts status, probe descriptions, status descriptions, and long-form diagnostics
- **User-Friendly**: Interactive CLI prompts for hostname input
- **Jupyter Notebook Ready**: Runs seamlessly in Jupyter environments

## Technology Stack

- **Language**: Python 3.12
- **Async Framework**: asyncio for coroutine-based concurrency
- **HTTP Client**: aiohttp for async HTTP requests
- **File I/O**: aiofiles for non-blocking file operations
- **API**: Pingdom REST API v3.1
- **Output Format**: CSV (comma-separated values)

## Use Cases

- **Infrastructure Validation**: Verify hostname availability across multiple environments
- **Migration Testing**: Confirm DNS and routing configurations post-migration
- **Health Check Automation**: Scheduled availability checks integrated into monitoring workflows
- **Compliance Reporting**: Generate CSV reports for uptime SLA documentation
- **DevOps Pipelines**: Integrate into CI/CD workflows for deployment validation

## Configuration

Simple environment-based configuration:

- **API Key**: Set via `api_key` variable (Pingdom Bearer token)
- **Target URLs**: Interactive comma-separated input
- **Output File**: Configurable CSV filename (default: `pingdom_results.csv`)

## Example Usage

```python
# Run the script
python pingdom_check.py

# Enter target URLs when prompted
Enter the target URLs separated by commas: example.com, test.example.org, api.mysite.net

# Output generated: pingdom_results.csv
```

### Sample CSV Output

| Check Name   | Target URL  | Status | Probe Description | Status Description | Long Status Description | Pingdom Check ID |
| ------------ | ----------- | ------ | ----------------- | ------------------ | ----------------------- | ---------------- |
| Example Site | example.com | up     | OK                | HTTP OK            | 200 OK                  | 12345678         |

## Results & Impact

- **Time Savings**: Concurrent execution reduces check time from minutes to seconds
- **Operational Efficiency**: Eliminates manual Pingdom portal checks for bulk operations
- **Audit Trail**: CSV output provides timestamped records for compliance
- **Scalable**: Handles hundreds of hostnames in a single execution

---

<div class="row justify-content-center">
    <div class="col-sm-10 mt-3">
        <a href="https://github.com/mainulhossain123/pingdom-hostname-check" class="btn btn-primary" target="_blank">
            <i class="fab fa-github"></i> View on GitHub
        </a>
    </div>
</div>
